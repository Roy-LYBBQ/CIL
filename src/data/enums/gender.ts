export enum Gender {
  Unknown = 'Unknown',
  Male = 'Male',
  Female = 'Female',
}

export const GenderMap: Record<Gender, string> = {
  [Gender.Unknown]: '未知',
  [Gender.Male]: '男',
  [Gender.Female]: '女',
};
