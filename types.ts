export enum MealType {
  ANY = '随机',
  RICE = '中式饭菜', // Covers Rice bowls, Special dishes
  NOODLES = '粉面粥', // Covers Noodles and Porridge
  LIGHT = '轻食健康', // Covers Light meals
  INTL = '日韩/西式', // Covers Fast food, Japanese, Korean, SEA
  DRINKS = '小吃饮品', // Covers Snacks, Desserts, Drinks
  BBQ = '烧烤夜宵'   // Covers BBQ and Late night
}

export interface Meal {
  name: string;
  emoji: string;
  description: string;
  ingredients: string[];
  calories: string;
  timeToCook: string;
}

export interface MealHistoryItem extends Meal {
  id: string;
  timestamp: number;
  type: MealType;
}