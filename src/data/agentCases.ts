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
  {
    id: 'promotion-plan-precheck',
    categoryZh: '活动预检',
    categoryEn: 'Campaign precheck',
    titleZh: '大促上线前检查价格、库存和规则风险',
    titleEn: 'Precheck campaign price, stock, and rule risks',
    painZh: '活动前价格、优惠券、库存、赠品、限购规则混在多张表里，临上线才发现冲突。',
    painEn: 'Before a campaign, prices, coupons, stock, gifts, and limits sit in separate sheets and conflicts appear too late.',
    deliverableZh: '活动风险清单、可上线 SKU、需调整项、负责人备注。',
    deliverableEn: 'Campaign risk list, ready SKUs, required fixes, and owner notes.',
    promptZh: `请作为电商活动预检代理，帮我在活动上线前检查商品、价格、库存、优惠和规则是否存在冲突。
我会提供活动商品表、价格表、库存表、优惠券/满减规则、赠品或限购说明；如果资料不齐，请先说明哪些风险无法判断。
请按上线前真实检查流程处理：
1. 按 SKU 合并活动价、日常价、成本、库存、优惠规则、赠品和限购信息。
2. 标出风险：低于成本、优惠叠加过度、库存不足、赠品缺失、限购冲突、活动价高于日常价、字段缺失。
3. 把 SKU 分成可上线、改完可上线、建议暂缓三类，并说明原因。
4. 输出可复制到表格的风险清单，附今天最先要处理的事项和建议责任人。
交付目标：运营负责人能拿这份清单做上线前最后一轮确认。`,
    promptEn: `Act as an e-commerce campaign precheck agent. Before launch, check whether products, prices, stock, discounts, and rules conflict.
I will provide campaign SKU, price, stock, coupon/discount, gift, or purchase-limit sheets. If something is missing, state which risks cannot be judged.
Follow a real pre-launch review:
1. Merge campaign price, regular price, cost, stock, discount rules, gifts, and purchase limits by SKU.
2. Flag risks: below-cost price, excessive stacked discounts, low stock, missing gifts, limit conflict, campaign price above regular price, missing fields.
3. Classify SKUs as ready / ready after fixes / should pause, with reasons.
4. Output a table-ready risk list, today's first actions, and suggested owners.
The final output should help the operations owner run the final launch check.`,
  },
  {
    id: 'competitor-price-monitor',
    categoryZh: '竞品价格',
    categoryEn: 'Competitor pricing',
    titleZh: '整理竞品价格变化和应对动作',
    titleEn: 'Summarize competitor price moves and responses',
    painZh: '竞品价格、券后价、赠品和销量变化分散，运营很难判断要不要跟价。',
    painEn: 'Competitor price, coupon price, gifts, and sales movement are scattered, making response decisions slow.',
    deliverableZh: '竞品变化摘要、影响 SKU、跟价/不跟价建议、观察清单。',
    deliverableEn: 'Competitor change brief, impacted SKUs, response recommendations, watch list.',
    promptZh: `请作为电商竞品价格分析代理，帮我整理竞品近期价格变化，并判断我们是否需要调整。
我会提供竞品采集表、我方 SKU 表、历史价格、库存和毛利信息；如果没有完整销量，请用价格和毛利先做阶段性判断。
请按运营决策来分析：
1. 对齐我方 SKU 与竞品商品，标注匹配置信度，避免把不相似商品硬凑在一起。
2. 计算竞品到手价变化、赠品变化、我方价差、毛利空间和库存压力。
3. 给出建议：跟价、维持、改赠品、改主图卖点、只观察，并说明业务理由。
4. 输出竞品变化摘要、受影响 SKU 表、今天建议动作和需要继续观察的商品。
交付目标：运营同事可以直接把建议同步给店长或类目负责人。`,
    promptEn: `Act as an e-commerce competitor-pricing agent. Summarize recent competitor price moves and decide whether we should respond.
I will provide competitor tracking, our SKU list, historical price, stock, and margin data. If sales data is incomplete, make a staged judgment from price and margin first.
Analyze for operations decisions:
1. Match our SKUs to competitor products with a confidence note; do not force weak matches.
2. Calculate competitor final-price movement, gift changes, our price gap, margin room, and stock pressure.
3. Recommend: match price, hold price, adjust gift, change selling-point emphasis, or watch only, with reasons.
4. Output a competitor brief, impacted SKU table, today's actions, and watch list.
The final output should be ready to share with the store lead or category owner.`,
  },
  {
    id: 'member-rfm-actions',
    categoryZh: '会员运营',
    categoryEn: 'Member operations',
    titleZh: '按会员分层生成触达动作',
    titleEn: 'Create actions by member segment',
    painZh: '会员表很大，但不知道谁该唤醒、谁该复购、谁该重点维护。',
    painEn: 'The member file is large, but it is unclear who to reactivate, repurchase, or retain.',
    deliverableZh: '会员分层、触达名单、权益建议、文案草稿。',
    deliverableEn: 'Member segments, outreach list, benefit suggestions, message drafts.',
    promptZh: `请作为电商会员运营代理，帮我把会员交易数据分层，并生成下一轮触达动作。
我会提供会员信息、近 90/180 天订单、客单价、品类偏好、优惠券使用和最近互动记录；字段不完整时，请说明你采用的替代口径。
请按可执行动作整理：
1. 用最近购买时间、购买次数、消费金额、品类偏好把会员分成高价值、潜力、沉睡、新客、流失风险等层级。
2. 每层说明人数、价值、主要特征和当前机会。
3. 给出触达动作：券/权益、推荐品类、触达渠道、优先级和不建议打扰的人群。
4. 为每层写 2 条自然的短信/私域/客服触达文案，避免夸张承诺。
交付目标：会员运营可以直接拿名单和文案安排下一轮触达。`,
    promptEn: `Act as an e-commerce member-operations agent. Segment members from transaction data and create the next outreach actions.
I will provide member data, last 90/180-day orders, AOV, category preference, coupon use, and recent interaction records. If fields are incomplete, state substitute definitions.
Make it actionable:
1. Segment members by recency, frequency, spend, and category preference into high-value, potential, dormant, new, churn-risk, or similar groups.
2. For each segment, explain size, value, traits, and current opportunity.
3. Recommend outreach: coupon/benefit, category suggestion, channel, priority, and groups that should not be bothered.
4. Write two natural message drafts per segment for SMS, private community, or support outreach, without exaggerated promises.
The final output should let member operations schedule the next outreach round directly.`,
  },
  {
    id: 'coupon-risk-audit',
    categoryZh: '优惠风险',
    categoryEn: 'Coupon risk',
    titleZh: '发现优惠券异常使用和疑似套利订单',
    titleEn: 'Find abnormal coupon use and suspicious orders',
    painZh: '大促后优惠券使用量暴涨，人工很难判断哪些是正常成交，哪些可能有风险。',
    painEn: 'Coupon use spikes after campaigns, and it is hard to separate normal orders from risky patterns.',
    deliverableZh: '风险订单、异常会员、规则漏洞、复核建议。',
    deliverableEn: 'Risky orders, abnormal members, rule gaps, review suggestions.',
    promptZh: `请作为电商优惠风险排查代理，帮我从订单和优惠券数据中找出异常使用模式。
我会提供订单表、优惠券核销表、会员表、退款表、收货信息或设备/渠道字段；如果敏感字段缺失，请只用现有字段做低风险推断。
请谨慎分析，不要轻易给用户贴标签：
1. 找出异常模式：同地址多账号、短时间多单、低实付高优惠、下单后集中退款、同券异常高频、渠道异常集中。
2. 给每条风险标注证据、置信度和建议复核方式，区分“强风险”和“需要观察”。
3. 总结可能的规则漏洞，例如门槛过低、可叠加过多、退款后券权益处理不清。
4. 输出风险订单表、异常模式摘要、规则调整建议和客服/风控复核清单。
交付目标：团队可以先复核高置信风险，同时不误伤正常用户。`,
    promptEn: `Act as an e-commerce coupon-risk audit agent. Find abnormal coupon-use patterns from order and coupon data.
I will provide orders, coupon redemption, member data, refunds, shipping info, or device/channel fields. If sensitive fields are missing, make only low-risk inferences from available data.
Analyze carefully and avoid unfair labels:
1. Find patterns: many accounts at one address, many orders in a short window, high discount with low payment, concentrated refunds, unusually high use of one coupon, channel concentration.
2. For each risk, include evidence, confidence, and suggested review method; separate strong risk from watch-only.
3. Summarize possible rule gaps such as low threshold, excessive stacking, unclear refund-after-coupon handling.
4. Output risky orders, abnormal-pattern summary, rule adjustment suggestions, and a review checklist.
The final output should help the team review high-confidence risk first without hurting normal customers.`,
  },
  {
    id: 'returns-reason-triage',
    categoryZh: '退货归因',
    categoryEn: 'Return triage',
    titleZh: '把退货退款原因变成整改优先级',
    titleEn: 'Turn return reasons into fix priorities',
    painZh: '退款原因写得很散，商品、仓库、客服都不知道先解决哪类问题。',
    painEn: 'Return reasons are messy, so product, warehouse, and support teams cannot see what to fix first.',
    deliverableZh: '退货主题、责任归因、重点 SKU、整改动作。',
    deliverableEn: 'Return themes, likely owners, key SKUs, corrective actions.',
    promptZh: `请作为电商退货归因代理，帮我把退货退款记录整理成可以推动整改的结论。
我会提供退货/退款表、订单表、SKU 信息、客服备注、评价或质检记录；如果文字很杂，请先合并同义表达。
请按影响和可改进性来分析：
1. 归类原因：质量、尺码/规格、描述不符、物流破损、包装、发错漏发、价格、冲动消费等。
2. 找出高频、高金额、高增长和重点 SKU 的退货问题。
3. 判断更可能由商品、供应商、仓库、物流、客服说明或活动预期造成，并标出不确定项。
4. 输出整改优先级、每类代表订单/原话、建议动作和下周跟踪指标。
交付目标：负责人能明确先改哪几类退货问题，以及每类交给谁推进。`,
    promptEn: `Act as an e-commerce return-reason triage agent. Turn return and refund records into conclusions that can drive fixes.
I will provide return/refund sheets, orders, SKU info, support notes, reviews, or inspection records. If text is messy, merge equivalent wording first.
Prioritize by impact and fixability:
1. Group reasons: quality, size/spec, description mismatch, shipping damage, packaging, wrong/missing item, price, impulse purchase, and data-specific themes.
2. Find high-frequency, high-value, fast-growing, and key-SKU return problems.
3. Judge likely owner: product, supplier, warehouse, logistics, support explanation, or campaign expectation; mark uncertainty.
4. Output fix priorities, representative orders/quotes, suggested actions, and next-week tracking metrics.
The final output should clarify which return issues to fix first and who should own each one.`,
  },
  {
    id: 'store-rating-rescue',
    categoryZh: '店铺评分',
    categoryEn: 'Store rating',
    titleZh: '找出店铺评分下滑的主要原因',
    titleEn: 'Find why store rating is dropping',
    painZh: '评分下滑时，大家只看到结果，不知道是物流、商品、客服还是售后拖了后腿。',
    painEn: 'When store rating drops, teams see the result but not whether logistics, product, support, or after-sales caused it.',
    deliverableZh: '评分拆解、风险来源、优先修复项、对外回复建议。',
    deliverableEn: 'Rating breakdown, risk sources, priority fixes, public response guidance.',
    promptZh: `请作为电商店铺评分诊断代理，帮我分析近期店铺评分下滑的主要原因和补救动作。
我会提供评分明细、评价、物流时效、客服响应、退款售后和订单数据；如果只能拿到部分数据，请先做可验证的拆解。
请按平台评分影响来整理：
1. 拆分商品体验、物流体验、客服/售后、描述一致性等维度的变化。
2. 找出导致下滑的时间段、SKU、订单类型、地区或客服班次线索。
3. 对每个风险来源给出短期补救和中期改进动作。
4. 输出评分下滑原因摘要、今日优先处理清单、需要回复的差评建议和复盘指标。
交付目标：店铺负责人能直接组织客服、物流和商品同事开一次补救会。`,
    promptEn: `Act as an e-commerce store-rating diagnosis agent. Analyze why store rating dropped recently and what should be fixed.
I will provide rating details, reviews, logistics timing, support response, refund/after-sales, and order data. If only partial data is available, make a verifiable breakdown first.
Organize by rating impact:
1. Split changes across product experience, logistics, support/after-sales, and description accuracy.
2. Find time windows, SKUs, order types, regions, or support shifts linked to the drop.
3. For each risk source, recommend short-term rescue and medium-term improvement.
4. Output a rating-drop brief, today's priority list, suggested negative-review responses, and follow-up metrics.
The final output should let the store owner run a focused recovery meeting.`,
  },
  {
    id: 'platform-rule-digest',
    categoryZh: '平台规则',
    categoryEn: 'Platform rules',
    titleZh: '把平台规则通知整理成业务影响清单',
    titleEn: 'Turn platform notices into an impact checklist',
    painZh: '平台通知很多，运营看完也不确定哪些商品、活动、客服话术需要调整。',
    painEn: 'Platform notices are frequent, and teams are unsure which SKUs, campaigns, or support wording need changes.',
    deliverableZh: '规则摘要、影响范围、应改事项、提醒时间。',
    deliverableEn: 'Rule summary, affected scope, required actions, reminder dates.',
    promptZh: `请作为电商平台规则解读代理，帮我把这些平台通知整理成业务同事能执行的清单。
我会提供平台公告、处罚通知、类目规则、活动报名规则或客服规范；请先提炼事实，不要扩展没有依据的内容。
请按业务影响输出：
1. 用大白话总结每条规则变化：变化内容、生效时间、适用范围、违反后果。
2. 判断可能影响哪些商品、页面资料、活动报名、价格设置、客服表达、发货售后流程。
3. 列出需要今天处理、上线前处理、持续观察的事项。
4. 输出一份规则影响清单，并附给运营/商品/客服的简短提醒文案。
交付目标：业务团队看完就知道哪些地方要改、什么时候改、谁来改。`,
    promptEn: `Act as an e-commerce platform-rule digest agent. Turn these platform notices into an action checklist business teams can follow.
I will provide platform announcements, penalty notices, category rules, campaign enrollment rules, or support guidelines. Extract facts first and avoid unsupported expansion.
Output by business impact:
1. Summarize each rule change plainly: what changed, effective date, scope, and consequence.
2. Judge likely impact on SKUs, listing material, campaign enrollment, price settings, support wording, shipping, and after-sales flow.
3. Separate actions for today, before launch, and ongoing watch.
4. Output a rule-impact checklist plus short reminder copy for operations, product, and support teams.
The final output should make clear what changes are needed, by when, and by whom.`,
  },
  {
    id: 'cross-warehouse-allocation',
    categoryZh: '库存调拨',
    categoryEn: 'Inventory allocation',
    titleZh: '判断跨仓调拨和备货优先级',
    titleEn: 'Decide cross-warehouse allocation priorities',
    painZh: '多仓库存不均，有的仓快断货，有的仓积压，人工判断调拨很慢。',
    painEn: 'Stock is uneven across warehouses; some are near stockout while others overstock.',
    deliverableZh: '调拨建议、风险 SKU、仓库优先级、待确认事项。',
    deliverableEn: 'Transfer suggestions, risky SKUs, warehouse priorities, confirmation items.',
    promptZh: `请作为电商库存调拨代理，帮我判断哪些 SKU 需要跨仓调拨或优先补货。
我会提供各仓库存、近 30 天销量、地区订单占比、在途库存、活动计划和物流成本；缺少成本时，请先按断货风险排序。
请按仓库执行场景分析：
1. 计算每个仓每个 SKU 的可售天数、断货风险、积压风险和需求地区匹配度。
2. 找出适合调拨的 SKU：A 仓过剩、B 仓不足、销量稳定、调拨成本可接受。
3. 给出调拨数量建议，并标注需要人工确认的库存锁定、在途、活动保留量。
4. 输出调拨建议表、补货优先级、无需调拨但需观察的 SKU。
交付目标：仓配负责人能据此安排今天的调拨和补货会议。`,
    promptEn: `Act as an e-commerce inventory-allocation agent. Decide which SKUs need cross-warehouse transfers or priority replenishment.
I will provide stock by warehouse, last-30-day sales, regional order share, incoming stock, campaign plans, and logistics cost. If cost is missing, rank by stockout risk first.
Analyze for warehouse execution:
1. Calculate days of supply, stockout risk, overstock risk, and regional demand match for each SKU and warehouse.
2. Find transfer candidates: warehouse A surplus, warehouse B shortage, stable sales, acceptable transfer cost.
3. Recommend transfer quantities and mark items needing human confirmation: locked stock, incoming stock, campaign reserve.
4. Output transfer suggestions, replenishment priorities, and SKUs to watch without transfer.
The final output should support today's warehouse and replenishment meeting.`,
  },
  {
    id: 'category-monthly-review',
    categoryZh: '类目复盘',
    categoryEn: 'Category review',
    titleZh: '生成类目月度经营复盘',
    titleEn: 'Prepare a monthly category review',
    painZh: '月底要看销售、利润、库存、投放、评价和竞品，材料多但结论难聚焦。',
    painEn: 'Monthly category review needs sales, profit, stock, ads, reviews, and competitors, but conclusions get scattered.',
    deliverableZh: '月度复盘摘要、问题诊断、下月重点、数据缺口。',
    deliverableEn: 'Monthly recap, diagnosis, next-month priorities, data gaps.',
    promptZh: `请作为电商类目复盘代理，帮我整理本月类目经营复盘。
我会提供销售、利润、库存、广告、退款、评价、竞品和活动数据；如果不同表时间口径不同，请先统一或说明差异。
请用经营负责人看得懂的方式输出：
1. 总结本月结论：增长/下滑原因、利润质量、库存压力、重点 SKU 表现。
2. 拆解关键变化：销量、客单、转化、广告效率、退款评价、竞品影响、活动贡献。
3. 提出下月 3-5 个重点动作，并说明预期影响和风险。
4. 输出一页复盘摘要、明细表、待确认数据和适合开会使用的发言提纲。
交付目标：类目负责人能直接用它准备月会或向老板汇报。`,
    promptEn: `Act as an e-commerce category review agent. Prepare this month's category performance review.
I will provide sales, profit, stock, ads, refunds, reviews, competitor, and campaign data. If time definitions differ across files, align them or state the differences.
Write for a category owner:
1. Summarize the month: growth/drop reasons, profit quality, stock pressure, key SKU performance.
2. Break down changes in sales, AOV, conversion, ad efficiency, refunds/reviews, competitor impact, and campaign contribution.
3. Propose 3-5 priorities for next month with expected impact and risk.
4. Output a one-page review, detail table, data gaps, and meeting speaking notes.
The final output should be ready for the category monthly meeting or management update.`,
  },
  {
    id: 'live-session-recap',
    categoryZh: '直播复盘',
    categoryEn: 'Live recap',
    titleZh: '把直播数据整理成下一场改进建议',
    titleEn: 'Turn live-commerce data into next-session actions',
    painZh: '直播后只有成交额和观看数，缺少对选品、节奏、话术和转化问题的复盘。',
    painEn: 'After live sessions, teams see GMV and viewers but not product, pacing, wording, or conversion lessons.',
    deliverableZh: '直播复盘、商品表现、节奏问题、下一场动作。',
    deliverableEn: 'Live recap, product performance, pacing issues, next-session actions.',
    promptZh: `请作为电商直播复盘代理，帮我把这场直播的数据整理成下一场可执行改进建议。
我会提供直播间数据、商品点击成交、时间段数据、主播话术备注、退款和用户互动记录；缺少分钟级数据时，请按商品和时段做粗颗粒分析。
请按下一场直播要改什么来分析：
1. 总结整体表现：观看、成交、转化、客单、退款、互动和流量来源。
2. 按商品和时段找出高转化、低转化、高点击低成交、库存或价格影响的环节。
3. 识别节奏问题：讲解过长、上链接时机、福利释放、问答回应、冷场时段。
4. 输出下一场选品、排品、话术、福利和场控提醒建议。
交付目标：直播运营能直接用它改下一场排品表和主播卡。`,
    promptEn: `Act as an e-commerce live-session recap agent. Turn this session's data into actions for the next live session.
I will provide live-room metrics, product clicks/orders, time-slot data, host notes, refunds, and audience interactions. If minute-level data is missing, analyze by product and time block.
Focus on what to change next time:
1. Summarize overall performance: viewers, sales, conversion, AOV, refunds, interactions, and traffic source.
2. By product and time block, find high conversion, low conversion, high click but low order, and stock/price issues.
3. Identify pacing issues: explanation too long, link timing, benefit release, Q&A handling, quiet periods.
4. Output next-session suggestions for product mix, run order, wording, benefits, and control-desk reminders.
The final output should help live operations update the next run sheet and host cards.`,
  },
  {
    id: 'sample-seeding-tracker',
    categoryZh: '达人样品',
    categoryEn: 'Creator samples',
    titleZh: '整理达人寄样进度和回收优先级',
    titleEn: 'Track creator samples and follow-up priority',
    painZh: '达人寄样后，谁收到了、谁发内容了、谁该催跟进，经常靠聊天记录记。',
    painEn: 'After creator samples are sent, receipt, content status, and follow-up priority are often buried in chats.',
    deliverableZh: '寄样进度表、逾期提醒、达人分层、跟进话术。',
    deliverableEn: 'Sample tracker, overdue reminders, creator tiers, follow-up wording.',
    promptZh: `请作为电商达人寄样跟进代理，帮我整理样品寄送、签收、内容产出和后续合作优先级。
我会提供达人名单、寄样表、物流状态、内容发布时间、合作费用和历史表现；资料不全时，请先做进度清单。
请按市场同事每天跟进的方式输出：
1. 合并达人、SKU、寄出时间、物流状态、签收时间、约定发布时间和内容链接。
2. 标出逾期未签收、签收未发布、发布效果待评估、适合继续合作的达人。
3. 按历史表现和本次状态给达人分层：重点维护、正常跟进、低优先级、暂停合作观察。
4. 输出今日跟进清单和自然的催收货/催发布/感谢复盘话术。
交付目标：市场同事能按优先级逐个跟进达人，不再翻聊天记录。`,
    promptEn: `Act as an e-commerce creator-sample follow-up agent. Organize sample shipment, receipt, content delivery, and next collaboration priority.
I will provide creator list, sample sheet, logistics status, content publish dates, collaboration cost, and historical performance. If data is incomplete, start with a progress tracker.
Output for daily marketing follow-up:
1. Merge creator, SKU, send date, logistics status, receipt date, promised publish date, and content link.
2. Flag overdue receipt, received but not published, published but needs evaluation, and creators worth continuing.
3. Segment creators by historical performance and current status: key maintain, normal follow-up, low priority, pause/watch.
4. Output today's follow-up list and natural wording for receipt reminder, publish reminder, and thank-you recap.
The final output should let marketing follow creators by priority without searching chats.`,
  },
  {
    id: 'merchandising-bundle-design',
    categoryZh: '组合销售',
    categoryEn: 'Bundle design',
    titleZh: '设计套装组合和加购建议',
    titleEn: 'Design bundles and add-on recommendations',
    painZh: '想提升客单价，但不知道哪些 SKU 适合搭配，哪些会拖低毛利。',
    painEn: 'Teams want higher AOV but do not know which SKUs bundle well or hurt margin.',
    deliverableZh: '套装方案、加购推荐、毛利测算、测试计划。',
    deliverableEn: 'Bundle proposals, add-on recommendations, margin estimate, test plan.',
    promptZh: `请作为电商组合销售代理，帮我根据订单和商品数据设计套装组合、加购推荐和测试计划。
我会提供订单明细、SKU 成本价、售价、毛利、库存、退货率和用户购买路径；如果缺少路径数据，请先用同单购买关系分析。
请按提升客单价但不伤利润的原则处理：
1. 找出经常同单购买、互补使用、同人群偏好的 SKU 组合。
2. 排除毛利过低、退货率高、库存不足或体验风险大的组合。
3. 给出套装价、加购价或满额推荐建议，并估算毛利影响。
4. 输出 5-10 个组合方案、适用场景、推荐文案和两周测试指标。
交付目标：运营和商品同事能直接选择 2-3 个方案上线测试。`,
    promptEn: `Act as an e-commerce bundle-design agent. Use order and SKU data to propose bundles, add-ons, and a test plan.
I will provide order lines, SKU cost, price, margin, stock, return rate, and purchase-path data. If path data is missing, use same-order relationships first.
Optimize AOV without damaging profit:
1. Find SKUs often bought together, used together, or preferred by the same customer group.
2. Exclude combinations with low margin, high return rate, insufficient stock, or experience risk.
3. Suggest bundle price, add-on price, or threshold recommendation and estimate margin impact.
4. Output 5-10 bundle ideas, use cases, recommendation copy, and two-week test metrics.
The final output should let operations and product teams choose 2-3 bundles to test.`,
  },
];
