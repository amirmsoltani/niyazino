import {CategoryType} from '~/types';

export const findParentCategory = (
  category_id: number,
  categoryObject: {[k: string]: CategoryType},
): number[] => {
  if (categoryObject[category_id].parent_id) {
    return [
      ...findParentCategory(
        categoryObject[category_id].parent_id!,
        categoryObject,
      ),
      categoryObject[category_id].parent_id!,
    ];
  } else {
    return [category_id];
  }
};
