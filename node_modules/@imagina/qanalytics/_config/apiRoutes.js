const moduleName = 'ianalytics';
const moduleVersion = 'v1';
const baseApiUrl = `${env('BASE_URL', 'http://localhost:8000')}/api`;
const urlBase = `${moduleName}/${moduleVersion}`


export default {
  urlBase : urlBase,
  version: moduleVersion,
  google: `${urlBase}/analytics`,
  marketplace: `${urlBase}/marketplace`,

}
