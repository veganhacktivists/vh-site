import 'server-only';

import mjml2html from 'mjml';

import { readableTimeDiff } from 'lib/helpers/date';

import type { PlaygroundApplication, PlaygroundRequest } from '@prisma/client';

const host =
  process.env.NODE_ENV === 'production'
    ? 'veganhacktivists.org'
    : 'localhost:3000';
const url =
  process.env.NODE_ENV === 'production' ? 'https://' + host : 'http://' + host;

const mail = (body: string, includeAACSection = false) => {
  const footerPixelsBackgroundColor = includeAACSection ? '#eee' : '#fff';

  const header = `
    <mj-section background-color="#fff" padding="0px">
      <mj-column>
        <mj-image padding="0px" alt="Vegan Hacktivists" src="${url}/images/email/VH-email-logo.gif"></mj-image>
      </mj-column>
    </mj-section>
  `;

  const AACSection = `
  <mj-section padding="0px">
    <mj-column>
      <mj-image padding="0px" alt="-" src="${url}/images/email/VH-email-section-transition.png"></mj-image>
    </mj-column>
  </mj-section>

  <mj-section padding="10px 25px" background-color="#eee">
    <mj-column background-color="#F7941D" width="40%" vertical-align="middle">
      <mj-image height="100%" padding="40px" alt="Animal Advocacy Careers" src="${url}/images/playground/animal-advocacy-careers.png"></mj-image>
    </mj-column>
    <mj-column width="60%" vertical-align="middle" padding-top="10px">
        <mj-text align="left" font-weight="bold" padding-bottom="0px">
          Looking for a job or career in animal advocacy?
        </mj-text>
        <mj-text align="left">
          Check out Animal Advocacy&apos;s job board which connects you to exciting animal nonprofit jobs with high potential for helping animals.
        </mj-text>
        <mj-button padding-top="0px" padding-bottom="0px" align="left" href="https://www.animaladvocacycareers.org/?ref=veganhacktivists.org">Explore Careers</mj-button>
    </mj-column>
  </mj-section>
`;

  const footer = `
    <mj-section background-color="${footerPixelsBackgroundColor}" padding="0px">
      <mj-column>
        <mj-image padding="0px" alt="-" src="${url}/images/email/VH-email-footer.png"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#161919" padding="0px 40px">
      <mj-column>
        <mj-image padding="0px" alt="-" src="${url}/images/email/VH-email-fruits.png"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#161919">
      <mj-text color="#ffffff" font-style="italic" font-size="12px" align="center">© 2024 Vegan Hacktivists. All rights reserved.</mj-text>
      <mj-spacer height="20px" />
      <mj-text color="#ffffff" font-size="12px" align="center"><b>Our mailing address is:</b><br/>
Vegan Hacktivists<br/>
505 Windy Knoll Dr. #876<br/>
Mount Airy<br/>
MD<br/>
21771<br/>
United States of America</mj-text>
    </mj-section>
    <mj-section background-color="#161919" padding="0px 100px">
      <mj-spacer height="5px" />
      <mj-column>
        <mj-image href="https://instagram.com/VeganHacktivists" width="30px" padding="5px" alt="IG" src="${url}/images/email/social-instagram.png"></mj-image>
      </mj-column>
      <mj-column>
        <mj-image href="https://www.youtube.com/channel/UCCQtxGjnbbUwmSMOpvQz3Eg" width="30px" padding="5px" alt="YT" src="${url}/images/email/social-youtube.png"></mj-image>
      </mj-column>
      <mj-column>
        <mj-image href="https://veganhacktivists.org/" width="30px" padding="5px" alt="HP" src="${url}/images/email/social-website.png"></mj-image>
      </mj-column>
      <mj-column>
        <mj-image href="mailto:hello@veganhacktivists.org" width="30px" padding="5px" alt="@" src="${url}/images/email/social-email.png"></mj-image>
      </mj-column>
      <mj-spacer height="20px" />
    </mj-section>
  `;
  return `
    <mjml>
      <mj-head>
        <mj-font name="Roboto" href="https://fonts.googleapis.com/css2?family=Roboto" />
        <mj-attributes>
          <mj-text align="center" font-family="Roboto, Helvetica, -apple-system,BlinkMacSystemFont,Segoe UI, Arial" line-height="1.5" font-size="16px" color="#161919"/>
          <mj-button border-left="10px solid #64BC46" background-color="#292929" border-radius="0px" font-family="Arial" font-weight="bold" font-size="16px" color="#ffffff" />
        </mj-attributes>
      </mj-head>
      <mj-body background-color="#DDDDDD">
      <mj-spacer height="10px" />
      ${header}
      <mj-section background-color="#ffffff">
        <mj-column>
          ${body}
        </mj-column>
      </mj-section>
      ${includeAACSection ? AACSection : ''}
      ${footer}
      <mj-spacer height="10px" />
      </mj-body>
    </mjml>
`;
};

export const verificationMail = (url: string, textonly = false) => {
  if (textonly) {
    return `Sign in to ${host}\n${url}\n\n`;
  }
  const body = `
    <mj-text font-weight="bold">Hey there!</mj-text>
    <mj-text>Someone tried to login to Playground with your email address.<br>If this was you, you're able to login here:</mj-text>
    <mj-button href="${url}">Click to login</mj-button>
    <mj-text>Otherwise you can safely ignore this mail.</mj-texta>
  `;
  return mjml2html(mail(body)).html ?? '';
};

export const verifyRequestEmail = (url: string, textonly = false) => {
  if (textonly) {
    return `Sign in to verify your request. ${host}\n${url}\n\n`;
  }
  const body = `
    <mj-text font-weight="bold">Hey there!</mj-text>
    <mj-text>To complete the request, please verify your email address.<br/>You can do so by clicking on the button below:</mj-text>
    <mj-button href="${url}">Click to verify</mj-button>
  `;
  return mjml2html(mail(body)).html ?? '';
};

export const grantRequestEmail = (body: string, textonly = false) => {
  if (textonly) {
    return body;
  }
  const html = `
    <mj-text font-weight="bold">Grant request</mj-text>
    <mj-text>${body}</mj-text>
  `;
  return mjml2html(mail(html)).html ?? '';
};

export const contactUsEmail = (body: string, textonly = false) => {
  if (textonly) {
    return body;
  }
  const html = `
    <mj-text>${body}</mj-text>
  `;
  return mjml2html(mail(html)).html ?? '';
};

export const playgroundRequestApplicationEmail = (textonly = false) => {
  if (textonly) {
    return `A new applicant has applied to help in Playground!
      <br/><br/>
      Please <a href="${url}/playground/admin/applications">click here</a> to review the applicant's request to help in Playground.`;
  }
  const body = `
    <mj-text>A new applicant has applied to help in Playground!</mj-text>
    <mj-button href="${url}/playground/admin/applications">Click here</mj-button>
    <mj-text>to review the applicant's request to help in Playground.</mj-text>
  `;
  return mjml2html(mail(body)).html ?? '';
};

export const playgroundReviewRequestEmail = (textonly = false) => {
  if (textonly) {
    return `A new request has been submitted to Playground for review!
    <br/><br/>
    Please <a href="${url}/playground/admin">click here</a> to review the request submitted to Playground.`;
  }
  const body = `
    <mj-text>A new request has been submitted to Playground for review!</mj-text>
    <mj-button href="${url}/playground/admin">View request</mj-button>
    <mj-text>Please click the button above to continue.</mj-text>
  `;
  return mjml2html(mail(body)).html ?? '';
};

export const playgroundApplicantIntroductionEmail = (
  application: Pick<PlaygroundApplication, 'name' | 'calendlyUrl'> & {
    request: Pick<PlaygroundRequest, 'name' | 'title' | 'calendlyUrl'>;
  },
  optionalMessageParts: string,
  textonly = false,
) => {
  if (textonly) {
    return `Hi ${application.request.name},
<br />
<br />
We&apos;re excited to let you know that we&apos;ve been able to find someone to help you with &ldquo;${
      application.request.title
    }&rdquo;!
<br />
<br />
Meet the person (cc&apos;ed to this email) below that applied to your request!
<br />
<br />
<b>Name:</b> ${application.name}
<br />
<br />
${optionalMessageParts}
<br />
<br />
<b>Note:</b> Please keep in mind that Playground volunteers often have full-time jobs and are helping in their spare time. While they have agreed to commit time to help you, they are often juggling multiple commitments so please be patient.
<br />
<br />
<b>What&apos;s next?</b>
<br />
<br />
We highly recommend you schedule a call as soon as possible to talk about the project&apos;s needs and expectations. You can do so by scheduling a call using ${
      application.request.name
    }&apos;s Calendy link <a href="${
      // TODO: sanitize this and all the other data?
      application.request.calendlyUrl
    }">here</a>${
      application.calendlyUrl
        ? ` or ${application.name}&apos;s Calendy link <a href="${application.calendlyUrl}">here</a>`
        : ''
    }.
<br />
<br />
<b>Important notice:</b>
<br />
<br />
<i>While we try our best to screen all applicants who applied to your request, we cannot guarantee the quality of work done by Playground volunteers. Is someone not responding at all? Or any other issues? Get in touch!</i>
<br />
<br />
Thank you so much for helping the animals, and for using Playground!
<br />
<br />
<b>Vegan Hacktivists</b>
`;
  }
  const body = `
    <mj-text>Hi ${application.request.name},</mj-text>
    <mj-text>
      We&apos;re excited to let you know that we&apos;ve been able to find someone to help you with &ldquo;${
        application.request.title
      }&rdquo;!</mj-text>
    <mj-text>Meet the person (cc&apos;ed to this email) below that applied to your request!</mj-text>
    <mj-text><b>Name:</b> ${application.name}</mj-text>
    <mj-text>${optionalMessageParts}</mj-text>
    <mj-text><b>Note:</b> Please keep in mind that Playground volunteers often have full-time jobs and are helping in their spare time. While they have agreed to commit time to help you, they are often juggling multiple commitments so please be patient.</mj-text>
    <mj-text><b>What&apos;s next?</b></mj-text>
    <mj-text>We highly recommend you schedule a call as soon as possible to talk about the project&apos;s needs and expectations. You can do so by scheduling a call using ${
      application.request.name
    }&apos;s Calendy link <a href="${
      // TODO: sanitize this and all the other data?
      application.request.calendlyUrl
    }">here</a>${
      application.calendlyUrl
        ? ` or ${application.name}&apos;s Calendy link <a href="${application.calendlyUrl}">here</a>`
        : ''
    }.</mj-text>
    <mj-text><b>Important notice:</b></mj-text>
    <mj-text><i>While we try our best to screen all applicants who applied to your request, we cannot guarantee the quality of work done by Playground volunteers. Is someone not responding at all? Or any other issues? Get in touch!</i></mj-text>
    <mj-text>Thank you so much for helping the animals, and for using Playground!</mj-text>
    <mj-text><b>Vegan Hacktivists</b></mj-text>
  }
  `;
  return mjml2html(mail(body, true)).html ?? '';
};

export const playgroundApplicationDenialEmail = (textonly = false) => {
  if (textonly) {
    return `Thanks so much for submitting your request to support with Playground!
<br />
<br />
Unfortunately someone else who applied to help with this request was chosen. Usually this just means that someone else who applied had more time to contribute or had more relevant qualifications for this specific request.
<br />
<br />
To help improve your chances to volunteer for future tasks, make sure that your application, resume/portfolio, and other materials are both up-to-date and have enough details to help us make an informed decision.
<br />
<br />
If you have any specific questions feel free to contact us <a href="${url}/contact">here</a>. In the meantime, check out <a href="${url}/playground/requests">other pending requests</a>!
<br />
<br />
Thank you so much for considering VH: Playground for your activism!`;
  }
  const body = `
    <mj-text>Thanks so much for submitting your request to support with Playground!</mj-text>
    <mj-text>Unfortunately someone else who applied to help with this request was chosen. Usually this just means that someone else who applied had more time to contribute or had more relevant qualifications for this specific request.</mj-text>
    <mj-text>To help improve your chances to volunteer for future tasks, make sure that your application, resume/portfolio, and other materials are both up-to-date and have enough details to help us make an informed decision.</mj-text>
    <mj-text>If you have any specific questions feel free to contact us <a href="${url}/contact">here</a>. In the meantime, check out <a href="${url}/playground/requests">other pending requests</a>!</mj-text>
    <mj-text>Thank you so much for considering VH: Playground for your activism!</mj-text>
  `;
  return mjml2html(mail(body, true)).html ?? '';
};

export const playgroundRequestDenialEmail = (textonly = false) => {
  if (textonly) {
    return `Thanks so much for submitting your request to Playground!
<br />
<br />
Unfortunately your request did not meet the relevant or quality standards needed to go live. Usually this means you didn't include enough details, but can also include other factors such as not being specifically a vegan request, being for-profit, etc.
<br />
<br />
If you have any specific questions, or believe this was a mistake, feel free to contact us <a href="${url}/contact">here</a>.
<br />
<br />
Thank you so much for considering VH: Playground for your request!`;
  }
  const body = `
    <mj-text>Thanks so much for submitting your request to Playground!</mj-text>
    <mj-text>Unfortunately your request did not meet the relevant or quality standards needed to go live. Usually this means you didn't include enough details, but can also include other factors such as not being specifically a vegan request, being for-profit, etc.</mj-text>
    <mj-text>If you have any specific questions, or believe this was a mistake, feel free to contact us <a href="${url}/contact">here</a>.</mj-text>
    <mj-text>Thank you so much for considering VH: Playground for your request!</mj-text>
  `;
  return mjml2html(mail(body, true)).html ?? '';
};

export const playgroundRequestApprovalEmail = (
  request: Pick<PlaygroundRequest, 'name' | 'id'>,
  textonly = false,
) => {
  if (textonly) {
    return `
   Your request is now live on Playground!
<br /><br />
Hey ${request.name}!
<br /><br />
Thanks for submitting your request to VH: Playground! We're happy to let you know that our team has reviewed and accepted your request, which means you can now view and share it online by <a href="${url}/playground/request/${request.id}">clicking this link</a>. Please keep in mind that Playground volunteers often have full-time jobs and are helping in their spare time. While they have agreed to commit a reasonable amount of time to help you, they are often juggling multiple commitments so please be patient.
<br /><br />
Playground is still growing! If you have any feedback or questions, feel free to reply to this email to get in touch, or visit our FAQ <a href="${url}/playground#faq">over here</a>.
<br /><br />
Thank you so much! `;
  }
  const body = `
    <mj-text font-weight="bold">Your request is now live on Playground!</mj-text>
    <mj-text>Hey ${request.name}!</mj-text>
    <mj-text>Thanks for submitting your request to VH: Playground! We're happy to let you know that our team has reviewed and accepted your request, which means you can now view and share it online by <a href="${url}/playground/request/${request.id}">clicking this link</a>. Please keep in mind that Playground volunteers often have full-time jobs and are helping in their spare time. While they have agreed to commit a reasonable amount of time to help you, they are often juggling multiple commitments so please be patient.</mj-text>
    <mj-text>Playground is still growing! If you have any feedback or questions, feel free to reply to this email to get in touch, or visit our FAQ <a href="${url}/playground#faq">over here</a>.</mj-text>
    <mj-text>Thank you so much!</mj-text>
  `;
  return mjml2html(mail(body, true)).html ?? '';
};

export const playgroundRequestRejectedDueToInactivity = (
  request: Pick<PlaygroundRequest, 'id' | 'name' | 'title'>,
  textonly = false,
) => {
  const createNewRequestUrl = `${url}/auth/signin?callbackUrl=${encodeURIComponent(
    url,
  )}%2Fplayground%2Fsubmit%3Fid%3D${request.id}`;

  if (textonly) {
    return `
Hey ${request.name}!
<br /><br />
We're sorry to inform you that due to inactivity, your request "${request.title}" opened in "VH: Playground" has been automatically closed.
<br /><br />
We're sorry that we couldn't find any volunteers to support you at this time but our platform is growing and improving, so we encourage you to continue submitting requests on Playground.
<br /><br />
Please make sure your requests include clear information about your project and the tasks you need help with, and please be thoughtful about your desired due date, as our volunteers often have full-time jobs and are helping out during their spare time.
<br /><br />
If you'd like to resubmit the same request, you can click below.
<br /><br />
If you have any questions and/or would like to provide feedback to us, please email Jess at jess@veganhacktivists.org.
<br /><br />
Resubmit your request: ${createNewRequestUrl}
`;
  }

  const body = `
<mj-text>Hey ${request.name}!</mj-text>
<mj-text>We're sorry to inform you that due to inactivity, your request "${request.title}" opened in "VH: Playground" has been automatically closed.</mj-text>
<mj-text>We're sorry that we couldn't find any volunteers to support you at this time but our platform is growing and improving, so we encourage you to continue submitting requests on Playground.</mj-text>
<mj-text>Please make sure your requests include clear information about your project and the tasks you need help with, and please be thoughtful about your desired due date, as our volunteers often have full-time jobs and are helping out during their spare time.</mj-text>
<mj-text>If you'd like to resubmit the same request, you can click below.</mj-text>
<mj-text>If you have any questions and/or would like to provide feedback to us, please email Jess at jess@veganhacktivists.org.</mj-text>
<mj-button href="${createNewRequestUrl}">Resubmit your request</mj-button>
`;
  return mjml2html(mail(body, false)).html ?? '';
};

export const playgroundRequestCompletedSurvey = (
  request: Pick<PlaygroundRequest, 'name' | 'title'>,
  textonly = false,
) => {
  const surveyUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSc_FrluU7o0q4sUT4v8uTWkC6J2mi7b_h3x1pq6o5UqlBjI9Q/viewform';

  if (textonly) {
    return `Hey ${request.name}!
<br /><br />
We just closed your request "${request.title}" opened in "VH: Playground" which (hopefully) means that our volunteers have completed the project/task you needed help with! 
<br /><br />
We would be very grateful if you could spend 5 minutes to complete a short survey to rate your experience with Playground. Your feedback is vital in helping us enhance the platform and create a better experience for everyone and ultimately help more animals. 
<br /><br />
Rest assured that your responses will remain confidential, and your personal information will not be shared with any third parties.
<br /><br />
Thank you for being an integral part of Playground's community, and we look forward to hearing from you.
<br /><br />
Survey: ${surveyUrl}
<br /><br />
Have a question? Contact us at hello@veganhacktivists.org.`;
  }

  const html = `
<mj-text>Hey ${request.name}!</mj-text>
<mj-text>We just closed your request "${request.title}" opened in "VH: Playground" which (hopefully) means that our volunteers have completed the project/task you needed help with!</mj-text>
<mj-text>We would be very grateful if you could spend 5 minutes to complete a short survey to rate your experience with Playground. Your feedback is vital in helping us enhance the platform and create a better experience for everyone and ultimately help more animals.</mj-text>
<mj-text>Rest assured that your responses will remain confidential, and your personal information will not be shared with any third parties.</mj-text>
<mj-text>Thank you for being an integral part of Playground's community, and we look forward to hearing from you.</mj-text>
<mj-button href="${surveyUrl}">Survey</mj-button>
<mj-text>Have a question? Contact us at hello@veganhacktivists.org.</mj-text>`;
  return mjml2html(mail(html)).html ?? '';
};

export const playgroundInternalNotificationForRequestsWithoutApplications = (
  request: Pick<
    PlaygroundRequest,
    'id' | 'title' | 'description' | 'category' | 'acceptedAt' | 'createdAt'
  >,
  textonly = false,
) => {
  const formattedDiff = readableTimeDiff(
    request.acceptedAt ?? request.createdAt,
  )[0]!;

  const viewRequestUrl = `${url}/playground/request/${request.id}`;

  if (textonly) {
    return `${request.category} playground request is unanswered for ${formattedDiff}
<br />
<br />
${request.title}
<br />
${request.description}
<br />
<br />
View request: ${viewRequestUrl}`;
  }

  const html = `
<mj-text font-weight="bold">${request.category} playground request is unanswered for ${formattedDiff}</mj-text>
<mj-text>${request.title}</mj-text>
<mj-text>${request.description}</mj-text>
<mj-button href="${viewRequestUrl}">View request</mj-button>
  `;
  return mjml2html(mail(html)).html ?? '';
};

export const playgroundRequestFeedbackAboutVolunteerAfter1Week = (
  request: Pick<PlaygroundRequest, 'name' | 'title' | 'providedEmail'>,
  applicantName: string,
  textonly = false,
) => {
  const positiveFeedback =
    'https://docs.google.com/forms/d/e/1FAIpQLSdyEH7tYlo1r3dC6ea8njsFY-gJnW-CBxn9wHr3-K88kSFY5Q/viewform';
  const negativeFeedback =
    'https://docs.google.com/forms/d/e/1FAIpQLSc0aQRvRY0pN6WeFuaR59OnjPH9vAIm2d6OSoDzhpbhP03FIg/viewform';

  if (textonly) {
    return `Hey ${request.name}!
<br /><br />
It’s been a week since we have connected you with a volunteer “${applicantName}” to help with your request "${request.title}" opened in "VH: Playground".
<br /><br />
Is this volunteer working out for you?
<br /><br />
Yes?: ${positiveFeedback}
<br /><br />
No?: ${negativeFeedback}
<br /><br />
Have a question? Contact us at hello@veganhacktivists.org.`;
  }

  const body = `
<mj-text>Hey ${request.name}!</mj-text>
<mj-text>It’s been a week since we have connected you with a volunteer “${applicantName}” to help with your request "${request.title}" opened in "VH: Playground".</mj-text>
<mj-text>Is this volunteer working out for you?</mj-text>
<mj-table align="center" width="60px">
  <tr>
    <td>
      <a target="_blank" href="${positiveFeedback}" style="display:inline-block;padding:0 15px 0 0;font-size:20px;margin:0;text-decoration:none;text-transform:none;mso-padding-alt:0px;border-radius:0px;">👍</a>
    </td>
    <td>
      <a target="_blank" href="${negativeFeedback}" style="display:inline-block;padding:0 0 0 15px;font-size:20px;margin:0;text-decoration:none;text-transform:none;mso-padding-alt:0px;border-radius:0px;">👎</a>
    </td>
  </tr>
</mj-table>
<mj-text><b>Have a question? Contact us at hello@veganhacktivists.org.</b></mj-text>
  }
  `;
  return mjml2html(mail(body, true)).html ?? '';
};
