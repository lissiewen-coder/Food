import { GoogleGenAI, Type } from "@google/genai";
import { Meal, MealType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const KNOWLEDGE_BASE = `
### 🍚 中式快餐 & 盖饭类
| 店铺名 | 推荐菜 | 备注 |
|--------|--------|------|
| 霸碗盖码饭 | 各类盖码饭 | 健康、下饭、分量足 |
| 御品蟹煲饭 | 牛蛙鸡爪煲 | 信价比高，蔬菜多，略油 |
| 客家本色 | 三杯鸭 | 酱汁下饭，出品稳定 |
| 金戈戈豉油鸡 | 豉油鸡 | 鸡肉滑嫩，常点口粮 |
| 湘兰兰 | 农家一碗香、井冈山豆皮 | 湘菜下饭，口味正宗 |
| 老成都川菜馆 | 辣子鸡 | 川菜经典，香辣过瘾 |
| 鹅宗族·澄海狮头鹅 | 卤鹅饭 | 潮汕风味，下饭 |
| 海底捞下饭火锅菜 | 番茄火锅菜 | 平价海底捞，推荐番茄味 |
| 三道功冒椒牛肉 | 干蘸冒椒牛肉 | 香辣下饭，调料绝 |
| 川渝冒菜王 | 冒菜+烤鸭 | 香辣下饭，烤鸭一般 |
| 姐夫家·老沈阳麻辣烫 | 麻辣烫+拌鸡架 | 入味不辣，鸡架绝 |

### 🍜 粉面粥类
| 店铺名 | 推荐菜 | 备注 |
|--------|--------|------|
| 华师傅过桥米线 | 过桥米线 | 汤鲜味美 |
| 兰溪手擀面 | 牛肉炒面 | 手擀面劲道，牛肉嫩 |
| 呼啦面馆 | 豌豆面（干馏） | 重庆小面口感，黏糊香辣 |
| 老汤和·乌鸡米线 | 乌鸡米线 | 汤底浓厚，米线软糯 |
| 想面 | 麻椒鸡腿拌面 | 麻香浓郁，推荐堂食 |
| 合记黄三牛 | 湿炒牛河 | 料多分量足，包装好 |
| 周聋子常德米粉 | 麻辣牛肉粉 | 湖南风味，麻辣鲜香 |
| 探秦记 | 大盘鸡拌面 | 西北风味，面条劲道 |

### 🌿 轻食 & 健康餐
| 店铺名 | 推荐菜 | 备注 |
|--------|--------|------|
| 超模厨房 | 轻食套餐、黑金鸡块 | 轻食中的佼佼者，小吃也很赞 |
| 牛油果物语 | 牛油果泥系列、奶昔 | 注意含香菜，牛肉香 |
| 喜赞轻食沙拉 | 各类沙拉 | 蔬菜新鲜，价格友好 |
| 植厂食堂 | 烤蔬蛋白碗、猪脚饭 | 干净美味，辣椒粉香 |
| 沙野轻食 | 碳烤鸡肉芒果沙拉 | 种类丰富，略贵 |
| 瘦子快跑·创意轻食 | 轻食套餐 | 蔬菜新鲜，肉量足 |

### 🍱 日韩 & 东南亚 & 西式
| 店铺名 | 推荐菜 | 备注 |
|--------|--------|------|
| 黄饷·咖喱蛋包饭 | 咖喱蛋包饭 | 咖喱浓郁，滑蛋嫩 |
| 贝瑞咖啡 | 黑椒牛肉起司流心三明治 | 早餐优选，每款都不错 |
| 泰富打抛饭 | 打抛饭 | 泰式风味，香辣开胃 |
| 石锅猪肚鸡 | 猪肚鸡、牛肉煲仔饭 | 暖胃滋补，适合降温天 |
| 达美乐 | 榴莲披萨、薄脆系列 | 周二周三七折，性价比高 |
| gaga | 咖喱鸡扒饭、全麦恰巴塔 | 健康西式，价格适中 |

### 🥡 小吃 & 甜品 & 饮品
| 店铺名 | 推荐菜 | 备注 |
|--------|--------|------|
| 袁记云饺 | 蟹籽云吞、红油拌云吞 | 皮软馅足，辣子香 |
| 明记甜品 | 芒果莲子双皮奶 | 广式甜品，口感细腻 |
| 阿嬷手作 | 龙眼桂花冰 | 清爽不腻，网红饮品 |
| 清补凉（哈工大西南门） | 清补凉 | 小料多，椰奶香 |

### 🍢 烧烤 & 夜宵
| 店铺名 | 推荐菜 | 备注 |
|--------|--------|------|
| 筷小鲜贵阳特色烧烤 | 脆哨饭 | 信价比较低，但味道不错 |
| 天成北串 | 烤串、烤面包片 | 烤串香，麻辣烫也好吃 |
| 贵州阿姨炒饭 | 炒饭 | 铁板炒饭香，夜宵首选 |

### 避雷名单 (DO NOT RECOMMEND)
| 店铺名 | 推荐菜 | 备注 |
|--------|--------|------|
| 缘禾米日料拉面简餐 | 避雷⚠️ | 面条难吃，鳗鱼怪 |
`;

export const generateMeal = async (type: MealType): Promise<Meal> => {
  const modelId = "gemini-2.5-flash";
  
  let specificPrompt = "";
  switch (type) {
    case MealType.RICE:
      specificPrompt = "请从知识库中推荐一家【中式快餐、盖饭、特色川湘菜】。";
      break;
    case MealType.NOODLES:
      specificPrompt = "请从知识库中推荐一家【粉面、粥、面馆】。";
      break;
    case MealType.LIGHT:
      specificPrompt = "请从知识库中推荐一家【轻食、沙拉、健康餐】。";
      break;
    case MealType.INTL:
      specificPrompt = "请从知识库中推荐一家【日韩料理、东南亚菜、西式快餐（如披萨、三明治）】。";
      break;
    case MealType.DRINKS:
      specificPrompt = "请从知识库中推荐一家【甜品、饮品、小吃（如云吞）】。";
      break;
    case MealType.BBQ:
      specificPrompt = "请从知识库中推荐一家【烧烤、夜宵、炒饭】。";
      break;
    case MealType.ANY:
    default:
      specificPrompt = "请从知识库中随机推荐任何一家好吃的店。";
      break;
  }

  const prompt = `你是一个美食助手。请基于以下的【美食知识库】来回答用户的请求。
  
  【美食知识库】
  ${KNOWLEDGE_BASE}
  
  【用户请求】
  ${specificPrompt}
  
  【要求】
  1. **必须** 优先从【美食知识库】中选择店铺和推荐菜。
  2. 绝对 **不要** 推荐“避雷名单”中的店铺。
  3. 如果知识库中没有完全匹配的类别，可以推荐知识库中风格最接近的，或者基于知识库的风格推荐一个非常知名的连锁品牌。
  4. 返回的 JSON 中：
     - "name" 应该是："[店铺名] - [推荐菜]" 的格式。
     - "description" 应该包含店铺的“备注”信息，并用诱人的语言润色。
     - "ingredients" 基于推荐菜名推断主要食材。
     - "calories" 和 "timeToCook" 请基于常识进行估算。
  
  请务必以 JSON 格式返回。`;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      systemInstruction: "你是一个可爱、热情的美食助手。你喜欢美食和可爱的风格。请务必用中文回答所有内容。",
      temperature: 1.0, 
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "店铺名 - 推荐菜" },
          emoji: { type: Type.STRING, description: "代表该食物的一个Emoji" },
          description: { type: Type.STRING, description: "结合备注信息的诱人描述（不超过2句话）" },
          ingredients: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "主要食材或配料列表（最多5个）"
          },
          calories: { type: Type.STRING, description: "大约热量（例如 '~350 大卡'）" },
          timeToCook: { type: Type.STRING, description: "准备/制作/等待时间（例如 '20 分钟'）" },
        },
        required: ["name", "emoji", "description", "ingredients", "calories", "timeToCook"],
      },
    },
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from AI");
  }

  try {
    return JSON.parse(text) as Meal;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Failed to generate a valid meal plan.");
  }
};