import { rejectOldRequestsWithoutApplicantsTask } from './rejectOldRequestsWithoutApplicantsTask';
import { sendInternalEmailNotificationForRequestsWithoutApplicationsTask } from './sendInternalEmailNotificationForRequestsWithoutApplicationsTask';
import { requestPlaygroundApplicantFeedbackTask } from './requestFeedbackTask';
import { invalidateContentfulTranslationCache } from './invalidateContentfulTranslationCache';

export function runHourlyTasks(): void {
  void rejectOldRequestsWithoutApplicantsTask();
  void sendInternalEmailNotificationForRequestsWithoutApplicationsTask();
  void requestPlaygroundApplicantFeedbackTask();
  void invalidateContentfulTranslationCache();
}
