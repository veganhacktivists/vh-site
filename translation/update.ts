// Update obsolete messages in source files

import { Project, SyntaxKind } from 'ts-morph';

import { isDefined } from '../src/lib/helpers/guards';

import {
  defaultTranslationPath,
  filesGlob,
  getTranslationsFromFile,
} from './_util';

import type { Node, ts } from 'ts-morph';
import type { TranslationFileStructureInternal } from './_util';

const project = new Project();
project.addSourceFilesAtPaths(filesGlob);

const languageService = project.getLanguageService();

void main();

async function main() {
  const currentTranslations = await getTranslationsFromFile(
    defaultTranslationPath,
  );

  updateFormattedMessageComponent(currentTranslations);
  updateUseIntlHook(currentTranslations);

  await project.save();
}

function getNamedImportReferences(importName: string) {
  const formatMessageNamedImport = project
    .getSourceFiles()
    .map((file) =>
      file
        .getImportDeclaration('react-intl')
        ?.getNamedImports()
        .find((namedImport) => namedImport.getName().includes(importName)),
    )
    .find(isDefined);

  if (!formatMessageNamedImport) {
    return;
  }

  return languageService.findReferencesAsNodes(formatMessageNamedImport);
}

function updateFormattedMessageComponent(
  translations: TranslationFileStructureInternal,
) {
  const references = getNamedImportReferences('FormattedMessage');

  const formatMessageNodes = references?.filter((x) =>
    x.getParent()?.getKindName().includes('Jsx'),
  );

  const attributesNode = formatMessageNodes
    ?.map((x) => x.getNextSiblingIfKind(SyntaxKind.JsxAttributes))
    .filter(isDefined);

  attributesNode?.forEach((x) => {
    const syntaxList = x.getChildren();

    syntaxList.forEach((x) => {
      const attributes = x.getChildren();
      const parsedAttributes = attributes.map((x) => x.getChildren());

      const idAttribute = parsedAttributes.find(
        ([key]) => key.getText() === 'id',
      );
      const defaultMessageAttribute = parsedAttributes.find(
        ([key]) => key.getText() === 'defaultMessage',
      );

      if (!idAttribute || !defaultMessageAttribute) {
        return;
      }

      replaceDefaultValue(idAttribute, defaultMessageAttribute, translations);
    });
  });
}

function updateUseIntlHook(translations: TranslationFileStructureInternal) {
  project.getSourceFiles().forEach((file) => {
    file
      .getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)
      .forEach((x) => {
        const children = x.getChildren();

        const syntaxList = children[1];

        if (!syntaxList?.isKind(SyntaxKind.SyntaxList)) {
          return;
        }

        const syntaxListEntries = syntaxList
          .getChildren()
          .map((x) => x.getChildren());

        const idProperty = syntaxListEntries.find(
          ([key]) => key?.getText() === 'id',
        );

        const defaultMessageProperty = syntaxListEntries.find(
          ([key]) => key?.getText() === 'defaultMessage',
        );

        if (!idProperty || !defaultMessageProperty) {
          return;
        }

        replaceDefaultValue(idProperty, defaultMessageProperty, translations);
      });
  });
}

function replaceDefaultValue(
  idPropTuple: Node<ts.Node>[],
  defaultValuePropTuple: Node<ts.Node>[],
  translations: TranslationFileStructureInternal,
) {
  const idNodeValue = idPropTuple?.[2].getText();
  const defaultMessageNodeValue = defaultValuePropTuple?.[2].getText();

  const idStringValue = idNodeValue?.slice(1, -1);

  const quotes = idNodeValue.slice(0, 1);

  if (
    idStringValue &&
    defaultMessageNodeValue &&
    translations[idStringValue] &&
    translations[idStringValue].message !== defaultMessageNodeValue.slice(1, -1)
  ) {
    defaultValuePropTuple?.[2].replaceWithText(
      quotes +
        translations[idStringValue].message.replaceAll(quotes, '\\' + quotes) +
        quotes,
    );
  }
}
