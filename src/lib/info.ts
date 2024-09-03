import { Info } from '~/api/generated';

export function getInfoTag(info: Info): string[] {
  const tags: string[] = [];
  if (info.infoCategories) {
    tags.push(...info.infoCategories.map((ic) => ic.category.name));
  }
  if (info.infoAngkatan) {
    tags.push(...info.infoAngkatan.map((it) => it.angkatan.year.toString()));
  }
  return tags;
}
