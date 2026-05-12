import type { Locale } from '@/i18n/config';

export type AgentCase = {
  id: string;
  categoryZh: string;
  categoryEn: string;
  titleZh: string;
  titleEn: string;
  painZh: string;
  painEn: string;
  deliverableZh: string;
  deliverableEn: string;
  promptZh: string;
  promptEn: string;
};

export function getAgentCasePrompt(item: AgentCase, locale: Locale) {
  return locale === 'zh' ? item.promptZh : item.promptEn;
}

export const agentCases: AgentCase[] = [
  {
    id: 'daily-sales-brief',
    categoryZh: '运营复盘',
    categoryEn: 'Operations recap',
    titleZh: '每天自动整理店铺经营日报',
    titleEn: 'Prepare a daily store performance brief',
    painZh: '运营每天看很多表：订单、流量、商品、广告，老板只想看结论。',
    painEn: 'Operators scan orders, traffic, SKUs, and ads while leaders only need the decisions.',
    deliverableZh: '一页经营摘要、异常清单、重点商品、明日动作。',
    deliverableEn: 'One-page brief, anomalies, key SKUs, and actions for tomorrow.',
    promptZh: `请作为电商运营分析代理，帮我整理今天的店铺经营日报。重点不是罗列数字，而是把“今天为什么这样、明天先做什么”说清楚。
我会提供订单、流量、商品、广告等导出表；如果字段不完整，请先说明你采用的口径和缺口，再用现有数据继续分析。
请根据实际数据灵活处理：
1. 先快速扫一遍数据结构，确认 GMV、订单数、客单价、转化率、广告花费、ROI、退款/取消等核心指标能否计算。
2. 找出值得运营主管关注的变化：明显涨跌、转化异常、广告花费高但产出低、库存影响销售、单品表现突变。
3. 对每个重点异常给出可能原因，不确定的地方标为“待确认”，不要硬下结论。
4. 最后输出一页中文经营摘要：今日结论、关键指标、异常原因、明日优先动作、需要人工确认的数据。
交付目标：运营主管可以直接拿这份摘要发给老板，或作为明早晨会材料使用。`,
    promptEn: `Act as an e-commerce operations analyst and prepare today's store performance brief. The goal is not to list numbers, but to explain what happened and what should happen tomorrow.
I will provide exports for orders, traffic, SKUs, ads, and related sheets. If fields are incomplete, state your assumptions and gaps, then continue with the usable data.
Work flexibly based on the actual files:
1. Scan the data structure and confirm whether GMV, orders, AOV, conversion rate, ad spend, ROI, refunds/cancellations can be calculated.
2. Highlight changes an operations lead should care about: sharp movement, weak conversion, high spend with low return, stock impact, unusual SKU movement.
3. Give likely reasons for each key anomaly; mark uncertain points as “needs confirmation” instead of forcing a conclusion.
4. Finish with a one-page brief: today's conclusion, key metrics, anomaly reasons, tomorrow's priority actions, and data that needs human confirmation.
The final brief should be ready to send to management or use in the next morning meeting.`,
  },
  {
    id: 'order-exception-followup',
    categoryZh: '订单履约',
    categoryEn: 'Order follow-up',
    titleZh: '筛出今天必须跟进的异常订单',
    titleEn: 'Find the orders that need follow-up today',
    painZh: '发货延迟、退款、地址异常、缺货混在订单表里，容易漏。',
    painEn: 'Delayed shipments, refunds, bad addresses, and stockouts are buried in order exports.',
    deliverableZh: '异常订单清单、原因分类、责任人、跟进话术。',
    deliverableEn: 'Exception list, reason tags, owner, and follow-up wording.',
    promptZh: `请作为电商订单跟进代理，帮我从今天的订单、物流、退款/售后数据里筛出最该处理的异常订单。
我可能只提供其中一部分表格；请先说明你能识别哪些异常，哪些需要补充数据。
请按真实业务优先级处理：
1. 识别超时未发货、物流停滞、地址/电话异常、缺货、重复退款、高金额订单异常等问题。
2. 给每条异常订单标注严重程度、异常原因、建议责任人（客服/仓库/采购/运营）和推荐处理动作。
3. 对需要联系用户的订单，生成简短、可复制、语气自然的跟进话术。
4. 输出一张适合直接复制到表格里的清单，并单独列出今天最优先处理的 10 条订单。
交付目标：团队拿到清单就能逐条分派和处理，不必回到原始表里重新找线索。`,
    promptEn: `Act as an e-commerce order follow-up agent. Use today's order, logistics, refund, and after-sales data to find the exceptions that need attention first.
I may provide only part of the data. Start by stating which exceptions you can detect and which ones would need more data.
Prioritize by real operational urgency:
1. Detect overdue shipment, stalled logistics, bad address/phone, stockout, duplicate refund, and high-value order anomalies.
2. For each exception, tag severity, reason, suggested owner (support/warehouse/procurement/operations), and recommended action.
3. For orders that need customer contact, draft short, natural, copy-ready follow-up wording.
4. Output a table-ready exception list, plus the top 10 orders that should be handled first today.
The final list should let the team assign and process orders directly without searching the raw exports again.`,
  },
  {
    id: 'customer-service-voc',
    categoryZh: '客服质检',
    categoryEn: 'Customer service',
    titleZh: '把客服聊天记录变成问题归因',
    titleEn: 'Turn support chats into issue themes',
    painZh: '聊天记录很多，但不知道用户到底在集中抱怨什么。',
    painEn: 'There are many chats, but no clear view of what customers complain about.',
    deliverableZh: '问题分类、典型原话、影响范围、改进建议。',
    deliverableEn: 'Issue themes, representative quotes, impact, and fixes.',
    promptZh: `请作为电商客服质检代理，帮我从这些聊天记录或工单里看出用户最集中、最影响体验的问题。
我会提供聊天记录、售后工单、差评备注或客服标签表；如果材料很杂，请先去重、合并相似表达，再保留有代表性的用户原话。
请按业务价值整理：
1. 归类问题主题，例如物流、尺码/规格、质量、价格、活动规则、客服态度、售后退款等；也可以根据实际内容新增分类。
2. 统计每类数量、占比和严重程度，区分“高频问题”和“低频但伤害大”的问题。
3. 每个重点问题保留 3-5 条典型原话，帮助团队感受真实用户声音。
4. 输出问题排行榜、可能根因、影响范围，以及可分派给运营/仓库/商品同事的改进动作。
交付目标：客服主管能直接用这份内容开周会，并把改进事项分给对应负责人。`,
    promptEn: `Act as an e-commerce customer-service quality agent. Use these chats or tickets to identify the customer issues that are most concentrated and most damaging to the experience.
I may provide chat logs, after-sales tickets, review notes, or support tags. If the material is messy, deduplicate and merge similar wording while preserving representative customer quotes.
Organize by business value:
1. Group issue themes such as logistics, size/spec, quality, price, campaign rules, support attitude, refund/after-sales; add new themes if the data calls for them.
2. Count volume, share, and severity, separating high-frequency issues from low-frequency but high-damage issues.
3. Keep 3-5 representative customer quotes for each major theme so the team can hear the real voice of customers.
4. Output an issue ranking, likely root causes, impact scope, and actions for operations/warehouse/merchandising teams.
The final output should be ready for a support lead to run a weekly meeting and assign improvements.`,
  },
  {
    id: 'new-product-readiness',
    categoryZh: '商品上新',
    categoryEn: 'Product launch',
    titleZh: '检查新品上架资料是否齐全',
    titleEn: 'Check whether new product launch materials are ready',
    painZh: '标题、卖点、规格、价格、图片、库存、资质材料经常缺一块。',
    painEn: 'Titles, selling points, specs, prices, images, stock, and certificates often miss pieces.',
    deliverableZh: '上新检查表、缺失项、风险等级、补齐建议。',
    deliverableEn: 'Launch checklist, missing items, risk level, and fixes.',
    promptZh: `请作为电商商品上新检查代理，帮我判断这批新品资料是否已经具备上架条件。
我会提供商品资料表、图片清单、价格表、库存表、资质/授权文件说明；如果资料不完整，请按现有材料先做判断，并列出补充项。
请结合实际上新风险来检查：
1. 检查商品名、类目、规格、价格、库存、主图/详情图、卖点、售后说明、资质等关键项。
2. 标出缺失、冲突或不合理信息，例如价格低于成本、规格前后不一致、图片数量不足、资质说明不清。
3. 按 SKU 给出判断：今天可上 / 补齐后再上 / 风险较高建议退回，并说明原因。
4. 输出上新检查表、补齐清单，以及可以直接发给商品同事的备注。
交付目标：商品负责人能快速决定哪些 SKU 今天推进，哪些需要补资料或重新确认。`,
    promptEn: `Act as an e-commerce product launch readiness agent. Help decide whether these new SKUs are ready to go live.
I will provide a product sheet, image list, price sheet, stock sheet, and certificate/authorization notes. If the material is incomplete, judge with what is available and list what is missing.
Check based on real launch risk:
1. Review product name, category, specs, price, stock, hero/detail images, selling points, after-sales notes, and certificates.
2. Flag missing, conflicting, or unreasonable information such as price below cost, spec mismatch, insufficient images, or unclear certificate notes.
3. For each SKU, classify it as ready today / ready after fixes / high risk and should be returned, with reasons.
4. Output a launch checklist, fix list, and notes that can be sent directly to the merchandising team.
The final output should help the product owner quickly decide which SKUs can move today and which need more material or confirmation.`,
  },
  {
    id: 'inventory-replenishment',
    categoryZh: '库存补货',
    categoryEn: 'Inventory',
    titleZh: '提前发现断货和积压风险',
    titleEn: 'Spot stockout and overstock risk early',
    painZh: '爆品容易断货，慢销品又压库存，人工看表太慢。',
    painEn: 'Hot SKUs stock out while slow movers pile up; manual review is slow.',
    deliverableZh: '补货优先级、断货预警、积压清单、建议动作。',
    deliverableEn: 'Replenishment priority, stockout warnings, overstock list, actions.',
    promptZh: `请作为电商库存补货代理，结合库存和近 30 天销量，帮我判断今天该补什么、缓什么、清什么。
我会提供库存表、近 30 天销量表、在途采购/到货计划、活动排期；如果缺少活动或在途数据，请先按基础库存风险分析。
请按实际经营场景判断：
1. 计算每个 SKU 的日均销量、可售天数、断货风险和积压风险；必要时说明计算假设。
2. 找出高优先级补货项：销量快、库存低、活动将近、在途不足、缺货会影响重点商品。
3. 找出需要处理的积压项：长期低销量、库存高、临期/过季、资金占用明显。
4. 输出补货建议、调拨/清仓建议、需要采购确认的问题，并按紧急程度排序。
交付目标：采购和运营能直接用这份清单安排今天的补货、暂停和清仓动作。`,
    promptEn: `Act as an e-commerce inventory replenishment agent. Use stock and last-30-day sales to decide what should be reordered, paused, or cleared today.
I will provide stock, last-30-day sales, incoming purchase/arrival plans, and campaign calendar. If campaign or incoming-stock data is missing, start with basic inventory risk.
Judge by real operating context:
1. Calculate daily average sales, days of supply, stockout risk, and overstock risk per SKU; state assumptions where needed.
2. Identify high-priority replenishment: fast sales, low stock, upcoming campaign, insufficient incoming stock, or stockout risk on key SKUs.
3. Identify overstock actions: long-term low sales, high stock, expiring/out-of-season items, or obvious capital pressure.
4. Output replenishment actions, transfer/clearance suggestions, and questions for procurement, sorted by urgency.
The final list should help procurement and operations decide today's reorder, pause, and clearance actions.`,
  },
  {
    id: 'supplier-quote-compare',
    categoryZh: '采购比价',
    categoryEn: 'Procurement',
    titleZh: '把多家供应商报价整理成选择建议',
    titleEn: 'Compare supplier quotes and recommend choices',
    painZh: '供应商报价格式不一，价格、账期、起订量、交期难比较。',
    painEn: 'Supplier quotes differ in format; price, payment terms, MOQ, and lead time are hard to compare.',
    deliverableZh: '报价对比表、推荐供应商、风险点、谈判清单。',
    deliverableEn: 'Quote comparison, supplier recommendation, risks, negotiation list.',
    promptZh: `请作为电商采购比价代理，帮我把这些供应商报价整理成采购能直接决策的版本。
我会提供供应商报价单、历史采购价、销量/库存需求、质量或售后记录；资料不齐时，请说明缺口并先给出阶段性判断。
请按采购决策逻辑处理：
1. 统一字段：供应商、SKU、单价、含税/不含税、起订量、交期、账期、运费、备注。
2. 和历史价比较，标出涨跌幅、异常报价和需要二次确认的条款。
3. 不只按最低价排序，要综合交期、起订量、质量记录、售后风险和库存需求给出推荐顺序。
4. 输出报价对比表、推荐供应商、备选供应商、谈判要点和风险提醒。
交付目标：采购同事可以拿这份表直接选择供应商，或复制谈判要点发起沟通。`,
    promptEn: `Act as an e-commerce procurement quote agent. Turn these supplier quotes into a version procurement can actually use for decisions.
I will provide supplier quotes, historical purchase price, sales/stock demand, and quality or after-sales records. If data is incomplete, state the gaps and give a staged recommendation.
Use procurement logic:
1. Normalize fields: supplier, SKU, unit price, tax status, MOQ, lead time, payment term, freight, notes.
2. Compare with historical price and flag price changes, abnormal quotes, and terms that need confirmation.
3. Do not rank by lowest price alone; weigh lead time, MOQ, quality record, after-sales risk, and inventory demand.
4. Output a quote comparison table, recommended supplier, backup supplier, negotiation points, and risk reminders.
The final table should let procurement choose a supplier or copy the negotiation points into supplier communication.`,
  },
  {
    id: 'ad-influencer-recap',
    categoryZh: '投放达人',
    categoryEn: 'Ads & creators',
    titleZh: '复盘投放和达人合作效果',
    titleEn: 'Review ads and creator collaboration results',
    painZh: '投放、达人、短视频、直播数据分散，不知道预算该加给谁。',
    painEn: 'Ad, creator, short-video, and live data are scattered; budget decisions are unclear.',
    deliverableZh: '效果排行、亏损原因、加投/停投建议、复盘摘要。',
    deliverableEn: 'Performance ranking, loss reasons, scale/stop suggestions, recap.',
    promptZh: `请作为电商投放复盘代理，帮我判断广告和达人合作的钱花得值不值，下一步预算该往哪里调。
我会提供广告消耗表、订单归因表、达人合作表、直播/短视频数据、佣金或坑位费；如果归因不完整，请先说明口径限制。
请按投放决策来分析：
1. 统一花费、成交、ROI、转化率、客单价、退款、佣金/坑位费等口径，必要时分“含佣金”和“不含佣金”两版。
2. 排出渠道/达人/素材效果榜，区分高 ROI、高成交但低利润、亏损项和需要继续观察的样本。
3. 对表现异常项给出可能原因：人群不准、素材弱、价格不匹配、库存/评价影响、退款高等。
4. 输出加投、降预算、暂停、继续观察的建议，并说明每条建议的依据。
交付目标：市场负责人能直接据此调整明天预算和达人合作安排。`,
    promptEn: `Act as an e-commerce ads and creator recap agent. Help decide whether ad and creator spend was worth it and where tomorrow's budget should move.
I will provide ad spend, order attribution, creator collaboration data, live/short-video data, and commission or placement fees. If attribution is incomplete, state the limits first.
Analyze for budget decisions:
1. Normalize spend, sales, ROI, conversion rate, AOV, refunds, commission/placement fee; if useful, show both with-commission and without-commission views.
2. Rank channels/creators/materials, separating high ROI, high sales but low profit, loss-making items, and items that need more observation.
3. Explain likely reasons for abnormal performance: wrong audience, weak creative, price mismatch, stock/review impact, high refunds.
4. Output recommendations to scale, reduce, pause, or watch, with the evidence behind each recommendation.
The final recap should let the marketing lead adjust tomorrow's budget and creator plan directly.`,
  },
  {
    id: 'reviews-voice-analysis',
    categoryZh: '评价洞察',
    categoryEn: 'Review insights',
    titleZh: '从好评差评里找商品改进方向',
    titleEn: 'Find product improvements from reviews',
    painZh: '评价、追评、退货原因很多，商品和运营不知道先改哪里。',
    painEn: 'Reviews, follow-up reviews, and return reasons are too many to prioritize.',
    deliverableZh: '评价主题、差评根因、商品改进、运营动作。',
    deliverableEn: 'Review themes, negative-review causes, product fixes, operations actions.',
    promptZh: `请作为电商评价洞察代理，帮我从评论、追评和退货原因里找出最值得改的商品和运营问题。
我会提供商品评价、差评、追评、退货/退款原因、客服备注；如果评论量很大，请先按主题抽样和聚类，再保留典型原话。
请按“能推动改进”来分析：
1. 按主题归类：质量、尺码、包装、物流、色差、气味、说明不清、价格、赠品等；也可以根据数据新增主题。
2. 区分高频问题、高伤害问题和近期突然变多的问题，列出典型用户原话。
3. 判断每类问题更可能由谁处理：商品、商品说明、客服话术、仓库包装、供应商或运营活动。
4. 输出本周优先改进清单、可立刻调整的运营动作、需要进一步确认的数据。
交付目标：商品、运营和客服能明确本周先改哪 3 件事，以及每件事谁负责。`,
    promptEn: `Act as an e-commerce review-insight agent. Use reviews, follow-up reviews, and return reasons to find the product and operations issues most worth improving.
I will provide product reviews, negative reviews, follow-up reviews, return/refund reasons, and support notes. If the volume is large, cluster by theme and keep representative quotes.
Analyze for action:
1. Group themes such as quality, size, packaging, logistics, color mismatch, smell, unclear instructions, price, gifts; add themes if the data suggests them.
2. Separate high-frequency issues, high-damage issues, and issues that recently increased, with representative customer quotes.
3. Decide who is most likely responsible for each issue: product, product description, support wording, warehouse packaging, supplier, or operations activity.
4. Output this week's improvement priorities, immediate operations actions, and data that needs more confirmation.
The final output should make the top 3 improvements and their owners clear to product, operations, and support.`,
  },
];
