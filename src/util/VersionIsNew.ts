import {version} from 'package.json';

export const versionIsNew = (
  latestVersion: string | string[],
  appVersion?: string[],
  index?: number,
): boolean => {
  if (typeof latestVersion === 'string') {
    return versionIsNew(latestVersion.split('.'), version.split('.'), 0);
  }
  if (index === 2) {
    return +latestVersion[index] > +appVersion![index];
  }
  return +latestVersion[index!] > +appVersion![index!]
    ? true
    : versionIsNew(latestVersion, appVersion, index! + 1);
};
