import { Info } from '~/api/generated';

export type InfoTag = {
  type: 'CATEGORY' | 'ANGKATAN' | 'GROUP';
  text: string;
};

export function getInfoTag(info: Info): InfoTag[] {
  const tags: InfoTag[] = [];
  if (info.infoCategories) {
    tags.push(
      ...info.infoCategories.map((ic) => ({
        type: 'CATEGORY' as const,
        text: ic.category.name,
      })),
    );
  }
  if (info.infoAngkatan) {
    tags.push(
      ...info.infoAngkatan.map((it) => ({
        type: 'ANGKATAN' as const,
        text: it.angkatan.year.toString(),
      })),
    );
  }
  if (info.infoGroups) {
    tags.push(
      ...info.infoGroups.map((ig) => ({
        type: 'GROUP' as const,
        text: ig.group,
      })),
    );
  }
  return tags;
}
