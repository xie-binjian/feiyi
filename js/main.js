// 页面DOM加载完成统一执行
document.addEventListener('DOMContentLoaded', function () {
    // 1. 导航滚动切换磨砂透明样式
    const navDom = document.querySelector('.nav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
            navDom.classList.add('scroll-active');
        } else {
            navDom.classList.remove('scroll-active');
        }
    })

    // 2. 生成静态柔和飘落粒子背景
    const particleBox = document.getElementById('particleBox');
    if (particleBox) {
        const particleCount = 25;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 12 + 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = Math.random() * 12 + 8 + 's';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particleBox.appendChild(particle);
        }
    }

    // 3. 数字滚动递增动画
    function animateNumber(el, targetNum) {
        let now = 0;
        const speed = targetNum / 40;
        const timer = setInterval(() => {
            now += speed;
            if (now >= targetNum) {
                clearInterval(timer);
                el.innerText = targetNum;
            } else {
                el.innerText = Math.floor(now);
            }
        }, 30)
    }
    // 元素进入视口才触发数字动画
    const numItems = document.querySelectorAll('.stat-number,.data-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(item => {
            if (item.isIntersecting) {
                const val = Number(item.target.innerText);
                if (!isNaN(val) && val !== Infinity) {
                    animateNumber(item.target, val);
                    observer.unobserve(item.target);
                }
            }
        })
    }, { threshold: 0.4 })
    numItems.forEach(item => observer.observe(item));
})

// ===================== 1. 轮播图逻辑 =====================
const bannerImgs = document.querySelectorAll('.banner-item');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentIndex = 0;
let timer;

function switchBanner(index) {
    bannerImgs.forEach(item => item.classList.remove('active'));
    bannerImgs[index].classList.add('active');
}
function nextSlide() {
    currentIndex = (currentIndex + 1) % bannerImgs.length;
    switchBanner(currentIndex);
}
function prevSlide() {
    currentIndex = (currentIndex - 1 + bannerImgs.length) % bannerImgs.length;
    switchBanner(currentIndex);
}
function autoPlay() {
    timer = setInterval(nextSlide, 3000);
}
autoPlay();

const bannerWrap = document.querySelector('.banner');
if (bannerWrap) {
    bannerWrap.addEventListener('mouseover', () => clearInterval(timer));
    bannerWrap.addEventListener('mouseout', autoPlay);
}
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// ===================== 2. 卡片页面跳转函数 =====================
function goPage(type) {
    window.location.href = `html/${type}.html`;
}

// ===================== 3. AI问答知识库与交互逻辑 =====================
const faqDatabase = {
    "剪纸": {
        "别名": ["剪纸艺术", "民间剪纸", "窗花"],
        "历史起源": ["剪纸艺术起源于中国，最早可追溯到汉代。当时人们用金箔、皮革等材料剪刻图案。真正用纸剪纸则始于南北朝时期，随着造纸术的发展而逐渐普及。", "剪纸的历史可以追溯到两千多年前的汉代，当时人们用薄金片和皮革雕刻图案。南北朝时期，随着纸张的普及，剪纸艺术开始真正发展起来。"],
        "技法": ["剪纸技法主要分为剪和刻两大类。剪是用剪刀直接裁剪，刻是用刻刀在纸上雕刻。常见技法有阴刻、阳刻、阴阳混刻、套色剪纸、染色剪纸等。", "剪纸的主要技法包括：阴刻（刻去图案部分，保留空白）、阳刻（保留图案部分，刻去空白）、阴阳混刻（两者结合）、套色剪纸（多色套印）、染色剪纸（在纸上染色）等。"],
        "代表作品": ["剪纸的代表作品有陕西的《八仙过海》、山东的《老鼠嫁女》、河北的《喜鹊登梅》等。各地剪纸风格迥异，北方粗犷豪放，南方细腻精巧。", "著名的剪纸作品包括：陕西剪纸《八仙过海》、山东剪纸《老鼠嫁女》、河北剪纸《喜鹊登梅》、广东剪纸《百鸟朝凤》等。"],
        "文化意义": ["剪纸不仅是装饰艺术，更是民俗文化的重要载体。它常用于窗花、喜花、礼花等场合，表达人们对美好生活的向往和祈福。", "剪纸在民俗活动中扮演重要角色，春节贴窗花、婚嫁贴喜花、丧葬贴纸钱，都体现了人们对生活的美好祝愿。"],
        "现状": ["随着现代化进程，传统剪纸面临传承挑战。但近年来，剪纸艺术逐渐走向国际舞台，成为中国文化对外交流的重要符号。", "传统剪纸技艺面临传承问题，但通过数字化保护和创新设计，剪纸艺术正在焕发新的生机，成为时尚和文创的重要元素。"],
        "制作工具": ["剪纸的主要工具包括：剪刀（尖头剪刀用于精细剪裁）、刻刀（用于雕刻细节）、蜡盘（保护刻刀和便于雕刻）、纸张（红纸、宣纸等）。"],
        "地区特色": ["中国剪纸流派众多，陕西剪纸粗犷豪放，山东剪纸细腻精巧，河北剪纸色彩艳丽，广东剪纸线条流畅，各有独特风格。"],
        "general": ["剪纸是中国最古老的民间艺术之一，以纸张为载体，剪刀刻刀为工具，题材包含花鸟、民俗、吉祥纹样。它不仅是装饰艺术，更是民俗文化的重要载体。"]
    },
    "皮影": {
        "别名": ["皮影戏", "灯影戏", "影子戏"],
        "历史起源": ["皮影戏起源于西汉时期，距今已有2000多年历史。传说汉武帝思念亡妃李夫人，方士用皮革制作了李夫人的影像，这被认为是皮影戏的雏形。", "皮影戏的起源可以追溯到汉代，相传汉武帝思念李夫人，方士李少翁用皮革制成李夫人的形象，通过灯光投射在纱帐上，这便是最早的皮影戏。"],
        "流派": ["皮影戏流派众多，主要有陕西皮影、河北皮影、山东皮影、四川皮影等。陕西皮影造型古朴粗犷，四川皮影细腻精巧，河北皮影则融合了戏曲特色。", "中国皮影戏主要流派：陕西皮影（古朴粗犷）、河北皮影（戏曲特色）、山东皮影（造型夸张）、四川皮影（细腻精巧）、甘肃皮影（风格古朴）。"],
        "制作工艺": ["皮影制作需经过选皮、制皮、画稿、雕刻、上色、装订等多道工序。传统皮影用牛皮或驴皮制作，现代也有用羊皮、塑料等材料。", "皮影制作工艺流程：选皮（选用年轻、毛色均匀的牛皮或驴皮）、制皮（刮去毛发和油脂）、画稿（在皮上绘制图案）、雕刻（用刻刀雕刻细节）、上色（用矿物颜料上色）、装订（安装关节和操纵杆）。"],
        "表演形式": ["皮影戏通过灯光将皮影投射在幕布上，艺人在幕后操纵皮影进行表演，同时配以唱腔、音乐和对白。一场皮影戏通常需要2-5名艺人配合。", "皮影戏表演时，艺人在白色幕布后操纵皮影，通过灯光投射形成影像。同时配以地方戏曲唱腔、锣鼓音乐和对白，展现故事情节。"],
        "文化意义": ["皮影戏被誉为'电影的先驱'，它融合了绘画、雕刻、音乐、戏曲等多种艺术形式，是中国民间艺术的瑰宝。", "皮影戏集绘画、雕刻、音乐、戏曲于一体，是一种综合性的民间艺术。它不仅是娱乐形式，更是文化传承的重要载体。"],
        "著名剧目": ["皮影戏的传统剧目包括《三国演义》、《水浒传》、《西游记》等古典名著改编的故事，以及民间传说和神话故事。"],
        "保护现状": ["皮影戏已被列入联合国教科文组织非物质文化遗产名录，近年来受到越来越多的关注和保护。"],
        "general": ["皮影戏又称灯影戏，通过兽皮雕刻人物，灯光投射幕布表演，流行于北方多地。它融合了绘画、雕刻、音乐、戏曲等多种艺术形式。"]
    },
    "风筝": {
        "别名": ["纸鸢", "风鸢", "鹞子"],
        "历史起源": ["风筝起源于中国春秋战国时期，最早用于军事侦察。相传墨子用木头制作了'木鸢'，后来鲁班改进为竹子制作。", "风筝的起源可以追溯到春秋战国时期，相传墨子用木头制成'木鸢'，能飞行三日。后来鲁班改用竹子制作，使风筝更加轻便灵活。"],
        "制作工艺": ["风筝制作分为扎、糊、绘、放四大工序。扎是用竹子扎制骨架，糊是用纸或绢糊在骨架上，绘是绘制图案，放是放飞技巧。", "风筝制作四艺：扎（用竹子绑扎骨架）、糊（用纸或绢糊在骨架上）、绘（绘制精美图案）、放（掌握放飞技巧和风力运用）。"],
        "流派": ["中国风筝流派主要有北京风筝、天津风筝、潍坊风筝、南通风筝等。潍坊风筝以造型精美、色彩艳丽著称，北京风筝则注重骨架结构。", "中国风筝主要流派：北京风筝（沙燕风筝为代表，注重骨架）、天津风筝（风筝魏，造型逼真）、潍坊风筝（色彩艳丽，题材丰富）、南通风筝（板鹞风筝，声音响亮）。"],
        "文化意义": ["风筝不仅是玩具，更是传统文化的象征。古人认为放风筝可以'放晦气'，祈求平安。风筝上的图案也蕴含着吉祥寓意。", "风筝在中国文化中象征着吉祥如意，放风筝被认为可以'放晦气'，带来好运。风筝上的吉祥图案如龙凤、蝙蝠、牡丹等都有特殊含义。"],
        "现状": ["山东潍坊是'世界风筝之都'，每年举办国际风筝节。风筝运动已成为一项普及的休闲活动，同时也是非物质文化遗产的重要组成部分。", "山东潍坊被誉为'世界风筝之都'，每年4月举办国际风筝节，吸引来自世界各地的风筝爱好者。风筝运动已成为全民健身活动的重要组成部分。"],
        "著名人物": ["风筝制作大师包括北京的哈亦琦、天津的魏元泰、潍坊的陈善庭等，他们为风筝艺术的发展做出了重要贡献。"],
        "放飞技巧": ["放风筝需要掌握风力、风向和提线技巧。选择合适的场地和时间，调整提线长度和角度，可以让风筝飞得更高更稳。"],
        "general": ["传统风筝起源春秋战国，融合绘画、竹扎工艺，古人用于祈福、游乐。风筝上的图案蕴含着吉祥寓意，是传统文化的重要象征。"]
    },
    "脸谱": {
        "别名": ["戏曲脸谱", "京剧脸谱", "花脸"],
        "颜色含义": ["脸谱颜色有特定含义：红色代表忠义勇敢（如关羽），黑色代表正直无私（如包拯），白色代表奸诈多疑（如曹操），黄色代表勇猛暴躁（如典韦），蓝色代表刚直桀骜（如窦尔敦）。", "脸谱颜色象征意义：红色（忠义、勇敢）如关羽；黑色（正直、无私）如包拯；白色（奸诈、多疑）如曹操；黄色（勇猛、暴躁）如典韦；蓝色（刚直、桀骜）如窦尔敦；绿色（勇猛、鲁莽）如程咬金。"],
        "历史起源": ["戏曲脸谱起源于古代的面具，经过长期演变形成独特的艺术形式。脸谱最早出现在唐代的歌舞戏中，后来逐渐发展完善。", "脸谱起源于古代的傩舞面具，唐代歌舞戏中开始使用面部彩绘，宋代戏曲中脸谱逐渐成熟，明清时期达到鼎盛。"],
        "流派": ["不同剧种的脸谱风格各异，京剧脸谱最为著名。此外还有豫剧、川剧、秦腔等剧种的脸谱，各有特色。", "各剧种脸谱特色：京剧脸谱（规范严谨，色彩鲜明）、豫剧脸谱（粗犷豪放）、川剧脸谱（变脸绝技）、秦腔脸谱（夸张生动）。"],
        "绘制技法": ["脸谱绘制讲究'四功五法'，即唱念做打和手眼身法步。绘制时先用底色打底，然后勾勒轮廓，最后填充色彩和细节。", "脸谱绘制步骤：打底色（用白色或肉色铺底）、勾轮廓（用墨线勾勒五官和图案）、填色彩（用矿物颜料填充）、画细节（绘制纹理和装饰）。"],
        "文化意义": ["脸谱不仅是化妆艺术，更是人物性格和命运的象征。它通过夸张的色彩和图案，帮助观众快速理解人物角色。", "脸谱是戏曲艺术的重要组成部分，通过色彩和图案的夸张表现，揭示人物的性格、身份和命运，让观众一目了然。"],
        "著名脸谱": ["著名的脸谱包括关羽的红脸、包拯的黑脸、曹操的白脸、孙悟空的猴脸、窦尔敦的蓝脸等，都是家喻户晓的经典形象。"],
        "演变发展": ["脸谱艺术经历了从简单到复杂、从写实到写意的演变过程，形成了独特的艺术风格和审美标准。"],
        "general": ["戏曲脸谱是中国传统戏曲的重要组成部分，通过五色油彩在脸上绘制图案，演绎人物忠奸善恶，是独特的艺术形式。"]
    },
    "泥塑": {
        "别名": ["泥人", "泥塑艺术", "民间泥塑"],
        "历史起源": ["泥塑艺术起源于新石器时代，最早的泥塑作品可以追溯到7000多年前。随着佛教传入中国，泥塑佛像成为重要的宗教艺术。", "泥塑艺术历史悠久，新石器时代就有简单的泥塑作品。秦汉时期泥塑艺术达到较高水平，唐代佛教泥塑更是精美绝伦。"],
        "代表作品": ["泥塑代表作品有陕西凤翔的'泥人张'、天津的'泥人张'、江苏惠山的泥人等。陕西凤翔泥塑造型夸张，色彩鲜艳，富有装饰性。", "著名泥塑作品：天津泥人张的《渔樵问答》、江苏惠山泥人的《大阿福》、陕西凤翔泥塑的《挂虎》、河南浚县的泥咕咕。"],
        "制作工艺": ["泥塑制作分为和泥、塑形、阴干、烧制、彩绘等工序。传统泥塑用黏土制作，现代也有加入其他材料以增加耐久性。", "泥塑制作工艺流程：和泥（选用黏性好的黏土，加水调和）、塑形（手工捏塑各种造型）、阴干（自然风干，防止开裂）、烧制（高温烧制，增加硬度）、彩绘（用矿物颜料上色）。"],
        "流派": ["中国泥塑流派众多，陕西凤翔泥塑、天津泥人张、江苏惠山泥人、河南浚县泥咕咕等最为著名。各地泥塑风格迥异，各具特色。", "中国泥塑主要流派：天津泥人张（写实细腻）、江苏惠山泥人（圆润可爱）、陕西凤翔泥塑（色彩鲜艳）、河南浚县泥咕咕（造型古朴）。"],
        "文化意义": ["泥塑是民间艺术的重要形式，它以泥土为原料，塑造出各种人物和动物形象，反映了劳动人民的生活情趣和审美观念。", "泥塑艺术源于生活，取材于民间故事、神话传说和现实生活，是劳动人民智慧和创造力的体现。"],
        "著名艺人": ["著名泥塑艺人包括天津泥人张创始人张明山、惠山泥人代表艺人王锡康、凤翔泥塑艺人胡深等。"],
        "现代创新": ["现代泥塑艺术在传统基础上进行创新，结合现代审美和工艺，创作出更多符合时代需求的作品。"],
        "general": ["民间泥塑以泥土为原料，手工捏塑各种人物和动物形象。它历史悠久，风格多样，是中国传统民间艺术的重要组成部分。"]
    },
    "竹编": {
        "别名": ["竹编工艺", "竹器", "竹制品"],
        "历史起源": ["竹编工艺起源于新石器时代，古人用竹子编织各种器具。随着时间的推移，竹编技术不断发展，从实用工具逐渐演变为工艺品。", "竹编工艺历史悠久，新石器时代遗址中就发现了竹编器具。商周时期竹编技术已相当成熟，唐宋时期达到鼎盛。"],
        "制作工艺": ["竹编制作分为选竹、破竹、刮篾、编织等工序。编织技法包括挑一压一、十字编、六角编、菱形编等多种方法。", "竹编制作工艺流程：选竹（选用优质毛竹）、破竹（将竹子劈成竹片）、刮篾（将竹片刮成均匀的竹丝）、编织（用各种技法编织）、打磨（打磨光滑）。"],
        "实用价值": ["竹编产品用途广泛，包括日常生活用品（如竹篮、竹筐）、家具（如竹椅、竹床）、工艺品（如竹编画、竹编摆件）等。", "竹编产品种类繁多：日常生活用品（竹篮、竹筐、竹席）、家具（竹椅、竹床、竹柜）、工艺品（竹编画、竹编花瓶、竹编摆件）、乐器（竹笛、竹笙）。"],
        "流派": ["中国竹编流派主要有浙江东阳竹编、福建泉州竹编、四川自贡竹编、湖南益阳竹编等。东阳竹编以精细著称，自贡竹编则以竹丝扇闻名。", "中国竹编主要流派：浙江东阳竹编（精细入微）、福建泉州竹编（造型精美）、四川自贡竹编（竹丝扇）、湖南益阳竹编（水竹凉席）。"],
        "文化意义": ["竹编是中国传统手工艺的瑰宝，它体现了人与自然的和谐共生。竹子寓意节节高升，竹编作品也承载着人们对美好生活的向往。", "竹子在中国文化中象征着高洁、坚韧和节节高升。竹编工艺体现了人与自然的和谐，是传统手工艺与现代生活结合的典范。"],
        "著名作品": ["著名竹编作品包括东阳竹编的《九龙壁》、自贡的竹丝扇、益阳的水竹凉席等，都是精美绝伦的艺术品。"],
        "环保意义": ["竹子生长迅速，是可再生资源。竹编产品环保耐用，符合现代绿色生活理念。"],
        "general": ["传统竹编以竹子为原料，通过一挑一压的编织技法制作各种器物。它兼具实用性和艺术性，是中国传统手工艺的重要组成部分。"]
    }
};

function getReply(question) {
    // ????????????
    const prefixes = ["???", "???", "????", "??", "??", "??", "????", "????", "????", "???"];
    let cleanQ = question;
    for (const prefix of prefixes) {
        if (cleanQ.startsWith(prefix)) {
            cleanQ = cleanQ.substring(prefix.length);
            break;
        }
    }
    cleanQ = cleanQ.toLowerCase().trim();
    const origQ = question.toLowerCase();
    
    // ???
    const greetings = ["??", "?", "hello", "hi", "??", "???"];
    if (greetings.some(g => origQ.includes(g))) {
        return "?????????????????????????????????????????????????????????????";
    }
    
    // "???" ???
    if (origQ.includes("???") || origQ.includes("????") || origQ.includes("??") || origQ.includes("??")) {
        if (origQ.includes("??") || origQ.includes("??") || origQ.includes("??") || origQ.includes("??")) {
            return "???????????
? ?? ?? ???????????
? ??? ?? ???????????
? ???? ?? ???????????
? ???? ?? ???????????
? ???? ?? ????????????
? ???? ?? ???????????

???????????????????";
        }
    }
    
    // ????
    for (const [category, topics] of Object.entries(faqDatabase)) {
        const aliases = topics["??"] ? topics["??"].map(a => a.toLowerCase()) : [];
        const catKeywords = [category.toLowerCase(), ...aliases];
        
        let catMatched = false;
        for (const kw of catKeywords) {
            if (cleanQ.includes(kw) || origQ.includes(kw)) {
                catMatched = true;
                break;
            }
        }
        
        if (!catMatched) continue;
        
        // ?????????????
        const topicSynonyms = {
            "????": ["??", "??", "??", "??", "????", "???", "????"],
            "??": ["??", "??", "??", "???", "????", "??", "??", "??"],
            "????": ["???", "??", "??", "???", "??"],
            "????": ["??", "??", "??", "??", "??", "??"],
            "????": ["??", "??", "??", "??", "??", "??", "??"],
            "????": ["??", "???", "??", "??", "??", "??", "???"],
            "????": ["??", "???", "??", "??"],
            "??": ["??", "??", "??", "??", "??"],
            "??": ["??", "??", "??", "??"],
            "????": ["??", "????", "??", "???"],
            "????": ["??", "??", "??", "??", "????"],
            "????": ["??", "??", "??", "???", "??"],
            "??": ["??", "??", "??", "??", "??"],
            "????": ["??", "??", "??", "??", "??", "??", "??"],
            "????": ["??", "??", "??"],
            "????": ["??", "??", "??", "???"]
        };
        
        for (const [topic, answers] of Object.entries(topics)) {
            if (topic === "??" || topic === "general") continue;
            
            const keywords = [topic, ...(topicSynonyms[topic] || [])];
            for (const kw of keywords) {
                if (cleanQ.includes(kw) || origQ.includes(kw)) {
                    return Array.isArray(answers) ? answers[Math.floor(Math.random() * answers.length)] : answers;
                }
            }
        }
        
        // ????????
        if (topics["general"]) {
            return Array.isArray(topics["general"]) ? topics["general"][Math.floor(Math.random() * topics["general"].length)] : topics["general"];
        }
    }
    
    // ????????
    const defaultReplies = [
        "?????????????????????????????????????????????????????????",
        "??????????????????????????????????????????????",
        "???????????????????????????????????????????",
        "???????????????????????????????????????????????????"
    ];
    return defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
}
function quickAsk(text) {
    const input = document.getElementById('ask-input');
    if (input) input.value = text;
    sendMsg();
}

function sendMsg() {
    const input = document.getElementById('ask-input');
    const chatBox = document.querySelector('.chat-area');
    if (!input || !chatBox) return;
    const val = input.value.trim();
    if (!val) return;
    chatBox.innerHTML += `<div class="msg-user"><span>${val}</span></div>`;
    input.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'msg-ai loading';
    loadingDiv.innerHTML = '<span class="loading-text">正在思考中...</span>';
    chatBox.appendChild(loadingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    setTimeout(() => {
        chatBox.removeChild(loadingDiv);
        const reply = getReply(val);
        chatBox.innerHTML += `<div class="msg-ai"><span>${reply}</span></div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
}

const sendBtn = document.getElementById('send-btn');
if (sendBtn) sendBtn.addEventListener('click', sendMsg);
const askInput = document.getElementById('ask-input');
if (askInput) askInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMsg();
})

// ===================== 4. 留言本地存储功能 =====================
function submitComment(type) {
    const nameInput = document.getElementById(type + '-name');
    const emailInput = document.getElementById(type + '-email');
    const contentInput = document.getElementById(type + '-content');
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const content = contentInput.value.trim();
    if (!name || !content) {
        alert('请填写姓名和留言内容！');
        return false;
    }
    if (email && !isValidEmail(email)) {
        alert('请输入有效的邮箱地址！');
        return false;
    }
    const comment = {
        id: Date.now(),
        name: name,
        email: email,
        content: content,
        time: new Date().toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        })
    };
    const comments = JSON.parse(localStorage.getItem('comments_' + type) || '[]');
    comments.unshift(comment);
    localStorage.setItem('comments_' + type, JSON.stringify(comments));
    nameInput.value = '';
    emailInput.value = '';
    contentInput.value = '';
    renderComments(type);
    alert('留言提交成功！');
    return false;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function renderComments(type) {
    const commentsList = document.getElementById(type + '-comments-list');
    if (!commentsList) return;
    const comments = JSON.parse(localStorage.getItem('comments_' + type) || '[]');
    if (comments.length === 0) {
        commentsList.innerHTML = '<div class="no-comments">暂无留言，快来发表你的看法吧！</div>';
        return;
    }
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <div class="comment-header">
                <span class="comment-author">${comment.name}</span>
                <span class="comment-time">${comment.time}</span>
            </div>
            <div class="comment-content">${comment.content}</div>
        </div>
    `).join('');
}

// 页面加载自动渲染各页面留言
document.addEventListener('DOMContentLoaded', function () {
    const pages = ['paper', 'shadow', 'kite', 'face', 'clay', 'bamboo'];
    pages.forEach(page => {
        renderComments(page);
    });
});