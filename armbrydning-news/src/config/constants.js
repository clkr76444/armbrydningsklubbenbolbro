export const ADMIN_UID = "OT3NVoOeWMe2AROEUqaquMXTUnJ3";

const FIREBASE_DB_URL = "https://armbrydning-news-default-rtdb.europe-west1.firebasedatabase.app";

export const getNewsUrl = () => `${FIREBASE_DB_URL}/news.json`;
export const getNewsItemUrl = (newsId) => `${FIREBASE_DB_URL}/news/${newsId}.json`;
export const getContactsUrl = () => `${FIREBASE_DB_URL}/contactMessages.json`;
export const getContactItemUrl = (contactId) => `${FIREBASE_DB_URL}/contactMessages/${contactId}.json`;
export const getContactCompletedUrl = (contactId) => `${FIREBASE_DB_URL}/contactMessages/${contactId}/completed.json`;
export const getTrialSignupsUrl = () => `${FIREBASE_DB_URL}/trialSignups.json`;
export const getTrialSignupItemUrl = (signupId) => `${FIREBASE_DB_URL}/trialSignups/${signupId}.json`;
export const getTrialSignupCompletedUrl = (signupId) => `${FIREBASE_DB_URL}/trialSignups/${signupId}/completed.json`;
export const getSignupsUrl = () => `${FIREBASE_DB_URL}/signups.json`;
