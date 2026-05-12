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
    promptZh: `请作为电商运营分析代理，整理今天的店铺经营日报，聚焦经营判断。
输入：我会提供订单、流量、商品、广告等导出表。
请完成：
1. 先检查字段是否齐全，缺字段就列出缺口并继续分析可用部分。
2. 汇总 GMV、订单数、客单价、转化率、广告花费、ROI、退款/取消等核心指标。
3. 找出异常：环比大涨大跌、转化低、广告花费高但产出低、库存可能影响销售的商品。
4. 输出一页中文摘要：今天发生了什么、原因判断、明天优先动作、需要人工确认的数据。
停止标准：运营主管能直接把摘要发给老板或用它开早会。`,
    promptEn: `Act as an e-commerce operations analyst. Prepare today's store performance brief. Focus on business judgment.
Input: I will provide exports for orders, traffic, SKUs, ads, and related sheets.
Do:
1. Check whether required fields exist; list gaps and continue with usable data.
2. Summarize GMV, orders, AOV, conversion rate, ad spend, ROI, refunds/cancellations.
3. Find anomalies: sharp changes, low conversion, high spend with low return, stock issues affecting sales.
4. Produce a one-page brief: what happened, likely reasons, tomorrow's actions, data needing human confirmation.
Stop when an operations lead can send the brief to management or use it in the morning meeting.`,
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
    promptZh: `请作为电商订单跟进代理，筛出今天必须处理的异常订单，聚焦跟进清单。
输入：订单导出表、物流导出表、退款/售后表（有多少给多少）。
请完成：
1. 按规则识别异常：超时未发货、物流停滞、地址/电话异常、缺货、重复退款、高金额订单异常。
2. 给每条订单标注严重程度、异常原因、建议责任人（客服/仓库/采购/运营）。
3. 为客服生成可复制的简短跟进话术。
4. 输出 Excel 风格表格 + 10 条最优先处理订单 + 今日汇总。
停止标准：团队能照清单逐条处理，不需要再从原始表里找。`,
    promptEn: `Act as an e-commerce order follow-up agent. Find today's order exceptions. Focus on follow-up decisions.
Input: order export, logistics export, refund/after-sales sheet if available.
Do:
1. Detect exceptions: overdue shipment, stalled logistics, bad address/phone, stockout, duplicate refund, high-value anomalies.
2. Tag each order with severity, reason, and suggested owner (support/warehouse/procurement/operations).
3. Draft short copy-ready follow-up messages for customer service.
4. Output an Excel-style table, top 10 urgent orders, and today's summary.
Stop when the team can process the list directly without searching raw exports.`,
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
    promptZh: `请作为电商客服质检代理，分析这些客服聊天记录或工单，聚焦业务分析。
输入：聊天记录、售后工单、差评备注、客服标签表。
请完成：
1. 清洗明显重复和无意义内容，保留能说明问题的客户原话。
2. 按主题归类：物流、尺码/规格、质量、价格、活动规则、客服态度、售后退款等。
3. 统计每类数量、占比、严重程度，并列 3-5 条典型原话。
4. 输出：问题排行榜、根因判断、可直接给运营/仓库/商品同事的改进动作。
停止标准：客服主管能据此开周会并分派改进事项。`,
    promptEn: `Act as an e-commerce customer-service quality agent. Analyze these chats or tickets. Focus on business analysis.
Input: chat logs, after-sales tickets, review notes, support tags.
Do:
1. Remove obvious duplicates/noise while keeping useful customer quotes.
2. Group by theme: logistics, size/spec, quality, price, campaign rules, support attitude, refund/after-sales.
3. Count volume, share, severity, and list 3-5 representative quotes per major theme.
4. Output issue ranking, likely root causes, and actions for operations/warehouse/merchandising teams.
Stop when a support lead can run a weekly meeting and assign improvement tasks from it.`,
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
    promptZh: `请作为电商商品上新检查代理，检查这批新品资料是否可以上架，聚焦上架准备。
输入：商品资料表、图片清单、价格表、库存表、资质/授权文件说明。
请完成：
1. 检查必填项：商品名、类目、规格、价格、库存、主图/详情图、卖点、售后说明、资质。
2. 标出缺失、冲突、不合理项（如价格低于成本、规格不一致、图片数量不足）。
3. 按风险分级：必须补齐 / 建议优化 / 可先上线。
4. 输出每个 SKU 的检查结果、补齐清单、可直接发给商品同事的备注。
停止标准：商品负责人能判断哪些 SKU 今天能上，哪些必须退回补资料。`,
    promptEn: `Act as an e-commerce product launch readiness agent. Check whether these new SKUs are ready. Focus on launch readiness.
Input: product sheet, image list, price sheet, stock sheet, certificate/authorization notes.
Do:
1. Check required fields: product name, category, specs, price, stock, hero/detail images, selling points, after-sales notes, certificates.
2. Flag missing, conflicting, or unreasonable items such as price below cost, spec mismatch, insufficient images.
3. Grade risk: must fix / should improve / can launch now.
4. Output each SKU's status, fix list, and notes ready to send to merchandising.
Stop when the product owner can decide which SKUs can launch today and which need more materials.`,
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
    promptZh: `请作为电商库存补货代理，分析库存和近 30 天销售，聚焦补货判断。
输入：库存表、近 30 天销量表、在途采购/到货计划、活动排期（如果有）。
请完成：
1. 计算每个 SKU 的日均销量、可售天数、断货风险、积压风险。
2. 标出高优先级补货：销量快、库存低、活动将近、在途不足。
3. 标出需要处理的积压：长期低销量、库存高、临期/过季。
4. 输出补货建议、调拨/清仓建议、需要采购确认的问题。
停止标准：采购和运营能用清单决定今天补什么、停什么、清什么。`,
    promptEn: `Act as an e-commerce inventory replenishment agent. Analyze stock and last-30-day sales. Focus on replenishment decisions.
Input: stock sheet, last-30-day sales, incoming purchase/arrival plan, campaign calendar if available.
Do:
1. Calculate daily average sales, days of supply, stockout risk, overstock risk per SKU.
2. Flag high-priority replenishment: fast sales, low stock, upcoming campaign, insufficient incoming stock.
3. Flag overstock: long-term low sales, high stock, expiring/out-of-season items.
4. Output replenishment actions, transfer/clearance suggestions, and questions for procurement.
Stop when procurement and operations can decide what to reorder, pause, or clear today.`,
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
    promptZh: `请作为电商采购比价代理，整理这些供应商报价，聚焦采购决策。
输入：供应商报价单、历史采购价、销量/库存需求、质量或售后记录（有多少给多少）。
请完成：
1. 统一字段：供应商、SKU、单价、含税/不含税、起订量、交期、账期、运费、备注。
2. 和历史价比较，标出涨跌幅和异常报价。
3. 综合价格、交期、起订量、质量记录给出推荐排序。
4. 输出谈判要点：可压价项、需确认项、风险项。
停止标准：采购同事能据此选择供应商或发起谈判。`,
    promptEn: `Act as an e-commerce procurement quote agent. Organize these supplier quotes. Focus on procurement decisions.
Input: supplier quotes, historical purchase price, sales/stock demand, quality or after-sales records if available.
Do:
1. Normalize fields: supplier, SKU, unit price, tax status, MOQ, lead time, payment term, freight, notes.
2. Compare with historical price and flag changes/anomalies.
3. Rank suppliers by price, lead time, MOQ, and quality records.
4. Output negotiation points: price-down opportunities, items to confirm, risks.
Stop when procurement can choose a supplier or start negotiation from the table.`,
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
    promptZh: `请作为电商投放复盘代理，分析广告和达人合作效果，聚焦投放复盘。
输入：广告消耗表、订单归因表、达人合作表、直播/短视频数据、佣金或坑位费。
请完成：
1. 统一口径：花费、成交、ROI、转化率、客单价、退款、佣金/坑位费。
2. 排出渠道/达人/素材效果榜，区分高 ROI、高成交但低利润、亏损项。
3. 分析可能原因：人群不准、素材弱、价格不匹配、库存/评价影响、退款高。
4. 输出加投、降预算、暂停、继续观察的建议清单。
停止标准：市场负责人能据此调整明天预算和达人合作。`,
    promptEn: `Act as an e-commerce ads and creator recap agent. Analyze ad and creator performance. Focus on performance recap.
Input: ad spend sheet, order attribution, creator collaboration sheet, live/short-video data, commission or placement fees.
Do:
1. Normalize metrics: spend, sales, ROI, conversion rate, AOV, refunds, commission/placement fee.
2. Rank channels/creators/materials and separate high ROI, high sales but low profit, and loss-making items.
3. Diagnose likely reasons: wrong audience, weak creative, price mismatch, stock/review impact, high refunds.
4. Output scale, reduce, pause, or watch-list recommendations.
Stop when the marketing lead can adjust tomorrow's budget and creator plan.`,
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
    promptZh: `请作为电商评价洞察代理，分析这些评论、追评和退货原因，聚焦业务分析。
输入：商品评价、差评、追评、退货/退款原因、客服备注。
请完成：
1. 按主题归类：质量、尺码、包装、物流、色差、气味、说明不清、价格、赠品等。
2. 区分高频问题和高伤害问题，列出典型用户原话。
3. 判断哪些应由商品改、页面说明改、客服话术改、仓库包装改、供应商改。
4. 输出商品改进优先级、可立刻调整的运营动作、需要进一步确认的数据。
停止标准：商品/运营/客服能明确本周先改哪 3 件事。`,
    promptEn: `Act as an e-commerce review-insight agent. Analyze reviews, follow-up reviews, and return reasons. Focus on business analysis.
Input: product reviews, negative reviews, follow-up reviews, return/refund reasons, support notes.
Do:
1. Group themes: quality, size, packaging, logistics, color mismatch, smell, unclear instructions, price, gifts.
2. Separate high-frequency issues from high-damage issues and list representative customer quotes.
3. Decide whether each issue belongs to product, product description, support wording, warehouse packaging, or supplier.
4. Output product-improvement priorities, immediate operations actions, and data needing confirmation.
Stop when product/operations/support know the top 3 things to fix this week.`,
  },
];
