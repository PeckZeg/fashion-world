# 视频 - 获取多重视频列表

## Base

* Method: `GET`
* Path: `/api/video/multi`

## Headers

Key             | Value                 | Required | Note
:-------------- | :-------------------- | :------: | :--------------------
`Authorization` | `Caa ${Base64String}` |          | [用户签名][signature]

* API Action: `video:fetch-multi-video-list`

## Query Params

Key           | Type       | Required | Default | Note
:------------ | :--------- | :------: | :------ | :--------
`offset`      | `Number`   |          | `0`    | 页面位移
`limit`       | `Number`   |          | `20`   | 每页限制
`channelId`   | `ObjectId` | √        |        | 频道编号
`videoLimit`  | `Number`   |          | `5`    | 每页限制
`recommendAt` | `string`   |          |        | 推荐时间，`on|off`

## Response Schema

```js
{
    "total": Number,                      //  总个数
    "categories": [                       //  分类列表
        {
          "channel": {
            // 频道信息，参见下方 `Channel` 模型文档
          },

          "videos": [
            {
              "channel": {
                // 频道信息，参见下方 `Channel` 模型文档
              },

              "category": {
                // 分类信息，参见下方 `Category` 模型文档
              },

              collectAt: Date,                //  [`Authorization`]收藏时间
                                              //    `null` - 未收藏
              favourAt: Date,                 //  [`Authorization`]点赞时间
                                              //    `null` - 未点赞

              // 视频信息，参见下方 `Video` 模型文档
              ...video
            }
          ],

          // 分类信息，参见下方 `Category` 模型文档
          ...category
        }
    ]
}
```

* [`Channel` 模型][channel-model]
* [`Category` 模型][category-model]
* [`Video` 模型][video-model]

## Error Codes

Status Code | Message                 | Note
:---------- | :---------------------- | :---------
`400`       | `invalid authorization` | 无效的验证信息
`400`       | `invalid signature`     | 无效的签名
`404`       | `apiKey not found`      | `apiKey` 未找到（登录过期）
`500`       | `Internal Server Error` | 服务端错误

## Example

**Request**

```
GET /api/video/multi?channelId=5923d5a2afa4194436827736&amp;videoLimit=1 HTTP/1.1
Host: localhost:3003
```

**Response**

```json
{
    "total": 8,
    "categories": [
        {
            "_id": "5978ac5997c46c20f1095470",
            "channelId": "5923d5a2afa4194436827736",
            "name": "人物专题",
            "createAt": 1501080665535,
            "publishAt": 1502532072535,
            "priority": 33,
            "cover": null,
            "channel": {
                "_id": "5923d5a2afa4194436827736",
                "name": "Fashion TV",
                "createAt": 1501080665133,
                "publishAt": 1486464752660,
                "priority": 4,
                "cover": null
            },
            "videos": [
                {
                    "_id": "598e37da97c46c20f17ab7e6",
                    "categoryId": "5978ac5997c46c20f1095470",
                    "channelId": "5923d5a2afa4194436827736",
                    "definitions": [
                        {
                            "definition": "1080p",
                            "url": "http://beta.videos.fashionworldcn.com/d19b0b317912fd36178867c01e2fac7eaa10663e.mp4"
                        },
                        {
                            "definition": "720p",
                            "url": "http://beta.videos.fashionworldcn.com/3dd92dd2ea002fd13f3eeb1674ae32ee887370f9.mp4"
                        },
                        {
                            "definition": "480p",
                            "url": "http://beta.videos.fashionworldcn.com/faafd17ca111ff1270032e3a0a73f2fec52a4a4c.mp4"
                        },
                        {
                            "definition": "360p",
                            "url": "http://beta.videos.fashionworldcn.com/ebdf3f974d53e89d7d63f91113038074b16e52e8.mp4"
                        }
                    ],
                    "priority": 0,
                    "size": 60601169,
                    "duration": 150050,
                    "screenshots": [
                        "http://beta.images.fashionworldcn.com/e428ab79fd87a09a0adcf7fb6d325482760ff13d.jpg",
                        "http://beta.images.fashionworldcn.com/fed5dfebe676a27923ccf813d75757b8d5841ca6.jpg",
                        "http://beta.images.fashionworldcn.com/d2f581c0e931f4422c1a80ee5cd88a9f71573e00.jpg",
                        "http://beta.images.fashionworldcn.com/12f4212fa541e1b9b6c9ea06f8fe0f5fc947f519.jpg",
                        "http://beta.images.fashionworldcn.com/9b865e5194f959878796f7ca275a20fdcda72d06.jpg"
                    ],
                    "createAt": 1502492634223,
                    "recommendAt": null,
                    "publishAt": 1505701474280,
                    "keywords": [],
                    "tags": [
                        "圆意界"
                    ],
                    "views": 500125,
                    "productionCountry": null,
                    "rightsOwner": null,
                    "year": null,
                    "castings": [],
                    "part": null,
                    "episode": null,
                    "season": null,
                    "summary": "治权运些离建参与光造候能派三有称阶。\n传往等没区里规想证名他先来么委节月。\n收电回般身转同斯定数算济心间划。\n式第争从压决军之列局而是管合头但管美。\n层还三府点织规导又产包头指她支长。\n儿反应织住集即革方员适记年。\n非教八阶因候动号处或表放数省计。\n风一二展造花门例每深所科青向集角。\n每白事认维京见素党中新权它。\n传相阶半上相水术电支各区精。\n始青合今层电理必议该只维。\n个选段资拉国好任设型规别局实。\n必对段由管证来者解适理子质看规族技究。\n开外务速日安治体至两口斗求立人。\n照公影许接连问性面必变关维音化。\n内共来到至清万却元月山信。\n图严种包题期资难意装东石管门。\n命层门山单科党论看备共她特气。\n人务前手主究温情能满关五最好要料。\n利情二律业空取海统速即发离术身我通人。\n",
                    "abstract": "却及没难车程你相断人反各收具。\n已山下采象局区子决完取切调保维办。\n革验律如信被山确争么向风易政。\n养也快家集准热些去照流张都任。\n定该省音具花极等义或使入百组。\n必个然共团据构参属持金装器月导权。\n路线通近史是切构几每所至人。\n其做该还公身条书根史商给间解真变向。\n观指月任党究较利记它状金易不。\n热切就志在照开合要又联改建看场界道须。\n金住非分圆学感回看音产音来世。\n小专联志由能家党片管计样说住合动无。\n龙任低力空毛取百九千克色完。\n儿眼图划号叫重科把众与持平下验业民前。\n都同活他识计话只团层单造并节计信结。\n权量调白反矿同风几样习第可深。\n",
                    "subtitle": "别己万他志日才除次革议向见局石达易表亲法带按带存铁经物人正设变于认根京又同近意原着时计县细习县低设己安今积办等特至到部如同过到用东地究劳通这以素状装色青称为去克需他感统然长实用节光量已写了美接前人说争从斯文验业划各",
                    "title": "及四各王已选领加米八空信存质干论生",
                    "cover": "http://beta.images.fashionworldcn.com/fed5dfebe676a27923ccf813d75757b8d5841ca6.jpg",
                    "channel": {
                        "_id": "5923d5a2afa4194436827736",
                        "name": "Fashion TV",
                        "createAt": 1501080665133,
                        "publishAt": 1486464752660,
                        "priority": 4,
                        "cover": null
                    },
                    "category": {
                        "_id": "5978ac5997c46c20f1095470",
                        "channelId": "5923d5a2afa4194436827736",
                        "name": "人物专题",
                        "createAt": 1501080665535,
                        "publishAt": 1502532072535,
                        "priority": 33,
                        "cover": null
                    },
                    "collections": 0,
                    "favourites": 0
                }
            ]
        },
        {
            "_id": "5978ac5997c46c20f1095472",
            "channelId": "5923d5a2afa4194436827736",
            "name": "时尚趋势",
            "createAt": 1501080665542,
            "publishAt": 1504458274827,
            "priority": 32,
            "cover": null,
            "channel": {
                "_id": "5923d5a2afa4194436827736",
                "name": "Fashion TV",
                "createAt": 1501080665133,
                "publishAt": 1486464752660,
                "priority": 4,
                "cover": null
            },
            "videos": [
                {
                    "_id": "598e37d997c46c20f17ab7d7",
                    "categoryId": "5978ac5997c46c20f1095472",
                    "channelId": "5923d5a2afa4194436827736",
                    "definitions": [
                        {
                            "definition": "1080p",
                            "url": "http://beta.videos.fashionworldcn.com/41b4ce505ec08dad93c481a50aff34ae6508693e.mp4"
                        },
                        {
                            "definition": "720p",
                            "url": "http://beta.videos.fashionworldcn.com/3b58da5af668ab9addc3ce331b664c17a17bfb8d.mp4"
                        },
                        {
                            "definition": "480p",
                            "url": "http://beta.videos.fashionworldcn.com/96456ebbc563d4cbdf0a679a6c53b5411db9756c.mp4"
                        },
                        {
                            "definition": "360p",
                            "url": "http://beta.videos.fashionworldcn.com/051656997a540263b5da980f8480d60389566d5b.mp4"
                        }
                    ],
                    "priority": 0,
                    "size": 60986898,
                    "duration": 150050,
                    "screenshots": [
                        "http://beta.images.fashionworldcn.com/d657eb4c99f56172769ed37cace7da9d4596fe05.jpg",
                        "http://beta.images.fashionworldcn.com/a906f123562ea9d33205ee358454e05d8646955f.jpg",
                        "http://beta.images.fashionworldcn.com/aea73fb478d9fa942eecd1c0c28d44ab123b4bbb.jpg",
                        "http://beta.images.fashionworldcn.com/a161f7f9b38f77ec5dc2be9fad32cd5cb32bd7c7.jpg",
                        "http://beta.images.fashionworldcn.com/26078792f658cfa3e67a530926a861563716b5ee.jpg"
                    ],
                    "createAt": 1502492633986,
                    "recommendAt": null,
                    "publishAt": 1505701507399,
                    "keywords": [],
                    "tags": [
                        "战说也导"
                    ],
                    "views": 500124,
                    "productionCountry": null,
                    "rightsOwner": null,
                    "year": null,
                    "castings": [],
                    "part": null,
                    "episode": null,
                    "season": null,
                    "summary": "素严此路边月生长装用种出须习眼办联。\n物斗都无商电角速严这低向才成人难。\n目住向增院离装全今西深数民手比往。\n议整把子温约强金内列部结验质。\n王北知用查取形美手与位例以信千连后。\n度约按积七常直队技系他口火千东增。\n先走然较眼看也例包并装没单类半人技。\n阶确中部今很集交矿消口美连业型。\n式根布备统级土之类越层到空料元于明。\n主进海直改市去属面维断长再此状大。\n海类习总可生见从报温照式地四少。\n器小府必重西量务取长后万须千林压部。\n准两铁机关习达管部又半义同次由委。\n山立维阶志节物果无情全小周群。\n",
                    "abstract": "米联集低有联结式出确价务然产构。\n会清面难整写声效区些己科林们身。\n复快采门之活造越新处公方己满。\n才深又六然改众高张适入色增节。\n便着关名石在平共却或生相群。\n立需不具地报青国气件响性他到思。\n社展适适线共业保分保图教已子。\n置间人军市经县方统派政报交。\n边取资照系按身族节三中回式农北什王。\n管给标长始毛很办确根一千志主形。\n适律必法果权品由与却向公布消存千她。\n置八些提半料斯条族受白华家受受全高备。\n",
                    "subtitle": "己形是种都今候府百些重共种你下",
                    "title": "调边有根性参具音务回从有经京成",
                    "cover": "http://beta.images.fashionworldcn.com/26078792f658cfa3e67a530926a861563716b5ee.jpg",
                    "channel": {
                        "_id": "5923d5a2afa4194436827736",
                        "name": "Fashion TV",
                        "createAt": 1501080665133,
                        "publishAt": 1486464752660,
                        "priority": 4,
                        "cover": null
                    },
                    "category": {
                        "_id": "5978ac5997c46c20f1095472",
                        "channelId": "5923d5a2afa4194436827736",
                        "name": "时尚趋势",
                        "createAt": 1501080665542,
                        "publishAt": 1504458274827,
                        "priority": 32,
                        "cover": null
                    },
                    "collections": 0,
                    "favourites": 0
                }
            ]
        },
        {
            "_id": "5978ac5997c46c20f1095474",
            "channelId": "5923d5a2afa4194436827736",
            "name": "流行资讯",
            "createAt": 1501080665549,
            "publishAt": 1494482370899,
            "priority": 31,
            "cover": null,
            "channel": {
                "_id": "5923d5a2afa4194436827736",
                "name": "Fashion TV",
                "createAt": 1501080665133,
                "publishAt": 1486464752660,
                "priority": 4,
                "cover": null
            },
            "videos": [
                {
                    "_id": "598e37da97c46c20f17ab7f2",
                    "categoryId": "5978ac5997c46c20f1095474",
                    "channelId": "5923d5a2afa4194436827736",
                    "definitions": [
                        {
                            "definition": "1080p",
                            "url": "http://beta.videos.fashionworldcn.com/1725b147abcb358f62cdbbfbbee2dc55d3528eae.mp4"
                        },
                        {
                            "definition": "720p",
                            "url": "http://beta.videos.fashionworldcn.com/30153a319a7b9841b225e3dd09e7534cf5d4bdba.mp4"
                        },
                        {
                            "definition": "480p",
                            "url": "http://beta.videos.fashionworldcn.com/f5784fc148a55dbb8d8ff08ac13bcbebf39362ff.mp4"
                        },
                        {
                            "definition": "360p",
                            "url": "http://beta.videos.fashionworldcn.com/56a90c73268425fe200caa0deccb2ac422d4bd9d.mp4"
                        }
                    ],
                    "priority": 0,
                    "size": 59717364,
                    "duration": 150050,
                    "screenshots": [
                        "http://beta.images.fashionworldcn.com/11608b8becc956b0426d4878abc184738ce456ef.jpg",
                        "http://beta.images.fashionworldcn.com/38b680e5936d4bab7900eb725e31fc723ce12991.jpg",
                        "http://beta.images.fashionworldcn.com/91d4f3def42a9b62676302e4a4a96614186f5a46.jpg",
                        "http://beta.images.fashionworldcn.com/30d8e0d0390af4636e1ae1e872db8cfa6fd6070f.jpg",
                        "http://beta.images.fashionworldcn.com/bde3fd69933e60541ae0459d0cd88fcc63826909.jpg"
                    ],
                    "createAt": 1502492634251,
                    "recommendAt": null,
                    "publishAt": 1505701468335,
                    "keywords": [],
                    "tags": [
                        "按院思程先常论资",
                        "用例这取江全"
                    ],
                    "views": 500125,
                    "productionCountry": null,
                    "rightsOwner": null,
                    "year": null,
                    "castings": [],
                    "part": null,
                    "episode": null,
                    "season": null,
                    "summary": "动华六取省时准手开且展至价。\n日治龙极国里土也况北电住京劳满易持四。\n复极集平非于广龙价世把改清。\n导因走意科记有法深火战安质离中调。\n又被众酸七集元林六八只如用四活各二党。\n报称物及它情门照取毛养确多更点多矿构。\n员党确你解机际干代说带了建。\n计见强东并象有住义去五一度管流江他铁。\n结中美节最研过出石改公育学。\n有率在九增基六计矿济产先共况快应料。\n那制回增为十活法往代而话太。\n县平没团住人米许例严有之影。\n华去权业动称写动过看度求志安火美近。\n和着该土复眼格都直写例走性流连。\n米特情量同小调报验例力种号日九题意。\n定世置约格而军影心处每那说然果。\n科位生将常白由斯着电气头量前小华国。\n马又心长生小采去员她今认路还放。\n",
                    "abstract": "道应解布对义据于则子容因变。\n先其进将状量叫基音质分给王完加叫。\n入儿温将十收联进利权却全标记。\n快业青该物解低实候么程子音风。\n又你际下再分知据入气本九争。\n府算者产放走了品你确局被名部名。\n住克群而前用知需对约物教报志华见四。\n十所金将放解点从和统再列规生写确。\n们金深备火叫且半都王过说面。\n共拉者干信全利压员能目力。\n",
                    "subtitle": "周科包段立严断她作设直形老拉划满候界马今叫加连很布于话列知无",
                    "title": "会作又分如统海多片",
                    "cover": "http://beta.images.fashionworldcn.com/91d4f3def42a9b62676302e4a4a96614186f5a46.jpg",
                    "channel": {
                        "_id": "5923d5a2afa4194436827736",
                        "name": "Fashion TV",
                        "createAt": 1501080665133,
                        "publishAt": 1486464752660,
                        "priority": 4,
                        "cover": null
                    },
                    "category": {
                        "_id": "5978ac5997c46c20f1095474",
                        "channelId": "5923d5a2afa4194436827736",
                        "name": "流行资讯",
                        "createAt": 1501080665549,
                        "publishAt": 1494482370899,
                        "priority": 31,
                        "cover": null
                    },
                    "collections": 0,
                    "favourites": 0
                }
            ]
        },
        {
            "_id": "5978ac5997c46c20f1095476",
            "channelId": "5923d5a2afa4194436827736",
            "name": "时装周",
            "createAt": 1501080665551,
            "publishAt": 1492060373812,
            "priority": 30,
            "cover": null,
            "channel": {
                "_id": "5923d5a2afa4194436827736",
                "name": "Fashion TV",
                "createAt": 1501080665133,
                "publishAt": 1486464752660,
                "priority": 4,
                "cover": null
            },
            "videos": [
                {
                    "_id": "598e0b2d97c46c20f17aa454",
                    "categoryId": "5978ac5997c46c20f1095476",
                    "channelId": "5923d5a2afa4194436827736",
                    "definitions": [
                        {
                            "definition": "1080p",
                            "url": "http://beta.videos.fashionworldcn.com/40497401abaefbf1ee44c88072a2da1d403a9708.mp4"
                        },
                        {
                            "definition": "720p",
                            "url": "http://beta.videos.fashionworldcn.com/2dddb0ddd98479d6d7c532c4a2fad23e0f6e0b8c.mp4"
                        },
                        {
                            "definition": "480p",
                            "url": "http://beta.videos.fashionworldcn.com/733a46d46dda8c96e756f58e90ff47dd7c5fe9c8.mp4"
                        },
                        {
                            "definition": "360p",
                            "url": "http://beta.videos.fashionworldcn.com/cd5e107d7532351c6e989584250e1b428d1296e1.mp4"
                        }
                    ],
                    "priority": 0,
                    "size": 194725546,
                    "duration": 487018,
                    "screenshots": [
                        "http://beta.images.fashionworldcn.com/e8944af8f68304db311b8c6d9a4e8f07fcc08ca9.jpg",
                        "http://beta.images.fashionworldcn.com/a6010ab5a632fbd49aa2f06b5549dd625ddf1e0c.jpg",
                        "http://beta.images.fashionworldcn.com/41ee77539a95b90abc225e54cf77e0eef71f77d1.jpg",
                        "http://beta.images.fashionworldcn.com/fb9657df3f77d9403faca989eca01aa664e794de.jpg",
                        "http://beta.images.fashionworldcn.com/6ed17b7a4092deb5d14bd2e52a8aa4e860e6cbe2.jpg"
                    ],
                    "createAt": 1502481197546,
                    "recommendAt": null,
                    "publishAt": 1505701555487,
                    "keywords": [],
                    "tags": [
                        "你千快声电",
                        "几变使级",
                        "长原"
                    ],
                    "views": 500137,
                    "productionCountry": null,
                    "rightsOwner": null,
                    "year": null,
                    "castings": [],
                    "part": null,
                    "episode": null,
                    "season": null,
                    "summary": "战四该公般院设四领更治最色口集技。\n常月下位层七专导好低省置。\n质而出即全整空量设听华所布层心年中。\n需等格三价别月条日斗次半最所题方这。\n前件族所系广领样水性去不高件元。\n明况增权最太或拉及包图战消内学。\n明程机入争越少了心政们金铁意级是通。\n老好义果复拉装决完象解土采矿志真机。\n主许只整革之适工月技几克应周点能。\n保些增离整只类给会节物治书公流消党。\n收公种路并老向起与们治细却广先极容社。\n好土第称相位术林用二七样达管高内见。\n易到较条才马定象其许广连感北众从。\n分红许例日程交受矿开带江今感类。\n整处回那没改段保速接发交规识思须还。\n物离名学热易复已指只反律国什例。\n况低空矿发消后速易率革历石回回个白。\n现眼反石反团放学低无走之中。\n选精业今圆期使何军太光数决加流自角。\n离五百层世周工间回人位放很老至向强。\n党己市很般展收行书此中须无王阶。\n期先科改经织党近门面我油。\n于养极包铁阶度完发些表行儿。\n象定调解听己认成争电式联天亲点斗商。\n积现样战高风把他信品积具设知话问。\n",
                    "abstract": "合间展元入什时照深机名群没各养强能定。\n通真实则队并时再状是局到了连江才解合。\n形同天收作期国流义之油百温证部。\n第可再样定会象入打区史矿向。\n每有验一状种办却料局原做委省府次圆。\n数所清取动志九切些则开给包大进。\n连米有率放花求全采号离手。\n交满支支林理文京收必而她型又。\n称增研总理参你没精当样到族求因当需可。\n龙本也率须治年历听按府外件就如。\n毛的联了写其响适百如层历深被成。\n",
                    "subtitle": "能把法务又出育单长经学总称下受半大转已没状得青人切劳全织想西斗给来何处飞叫包儿称按史响命小府认调他石车集到意极马克周程七积节山路始她外十运水可值难定速受容记风没速增里海清后证边把产阶",
                    "title": "了并些重红半",
                    "cover": "http://beta.images.fashionworldcn.com/b3e08d2aa81653e7c134b0dd7919a5658335dfed.jpg",
                    "channel": {
                        "_id": "5923d5a2afa4194436827736",
                        "name": "Fashion TV",
                        "createAt": 1501080665133,
                        "publishAt": 1486464752660,
                        "priority": 4,
                        "cover": null
                    },
                    "category": {
                        "_id": "5978ac5997c46c20f1095476",
                        "channelId": "5923d5a2afa4194436827736",
                        "name": "时装周",
                        "createAt": 1501080665551,
                        "publishAt": 1492060373812,
                        "priority": 30,
                        "cover": null
                    },
                    "collections": 0,
                    "favourites": 0
                }
            ]
        },
        {
            "_id": "5978ac5997c46c20f1095478",
            "channelId": "5923d5a2afa4194436827736",
            "name": "拍摄花絮",
            "createAt": 1501080665555,
            "publishAt": 1483344628361,
            "priority": 29,
            "cover": null,
            "channel": {
                "_id": "5923d5a2afa4194436827736",
                "name": "Fashion TV",
                "createAt": 1501080665133,
                "publishAt": 1486464752660,
                "priority": 4,
                "cover": null
            },
            "videos": [
                {
                    "_id": "598e0b2d97c46c20f17aa451",
                    "categoryId": "5978ac5997c46c20f1095478",
                    "channelId": "5923d5a2afa4194436827736",
                    "definitions": [
                        {
                            "definition": "1080p",
                            "url": "http://beta.videos.fashionworldcn.com/57f0f520933f3dfe8a3aa16bdb0315a38a5a0bc7.mp4"
                        },
                        {
                            "definition": "720p",
                            "url": "http://beta.videos.fashionworldcn.com/38342113cfaee5a7b37f3e1a0ebb9ce054d891d3.mp4"
                        },
                        {
                            "definition": "480p",
                            "url": "http://beta.videos.fashionworldcn.com/8c7c96a7f10658a2e2d9446f3eb110d61a2b2e11.mp4"
                        },
                        {
                            "definition": "360p",
                            "url": "http://beta.videos.fashionworldcn.com/3feb61a3067b81fffade01bfff536eab170873b5.mp4"
                        }
                    ],
                    "priority": 0,
                    "size": 48078012,
                    "duration": 120080,
                    "screenshots": [
                        "http://beta.images.fashionworldcn.com/a9d7f34937b45014367626a93f1748c848a27481.jpg",
                        "http://beta.images.fashionworldcn.com/26fdbc752220dd193a35f9e41e06c1b32750892d.jpg",
                        "http://beta.images.fashionworldcn.com/dedae3d53dd1a17c7794848fc05933a8de32fb3e.jpg",
                        "http://beta.images.fashionworldcn.com/a66411dcdfe23044f90529d1aa48fd9970be31b3.jpg",
                        "http://beta.images.fashionworldcn.com/8fa080f91b6340cd70008d7b4dc2027d2686b885.jpg"
                    ],
                    "createAt": 1502481197541,
                    "recommendAt": null,
                    "publishAt": 1505701557404,
                    "keywords": [],
                    "tags": [
                        "论也她林",
                        "活变者劳连"
                    ],
                    "views": 500105,
                    "productionCountry": null,
                    "rightsOwner": null,
                    "year": null,
                    "castings": [],
                    "part": null,
                    "episode": null,
                    "season": null,
                    "summary": "家人十或国北与为增资素强报九全。\n论据京来空市华上快用容龙。\n音美走那群论亲复先长色重展料。\n据好海正去化反本张题严县形人义设立。\n七照海子想国天时道每米加立向化便而。\n利矿参集角接属适花众数转厂片。\n住度力式能所型适指报达却能建把。\n该文具西业清设流识后对验你联矿来治。\n火布那自也些工头接系队难志者面千。\n一经体省做何些积们经力等何即。\n至小林任色程总石适化过事素满特程。\n几产无义几口话切总华张天样西。\n且别正格支议准毛资基点思引收机压。\n",
                    "abstract": "线现所么严式二道离式影制气权。\n形九她入今制只持代产响气育。\n道教以则亲内权张走些计时建期。\n话着养影思果价传局法众能千。\n给九约真自律向步关什长始面。\n管数主团名书越步持而传先术海流听过。\n件维米在节温变场已清如我题铁。\n性实联该日边革写进拉市维而际日。\n油七造位会动打系关本照例之口。\n难心所转立定得劳整理深象。\n此场先年单系内比划需容关路并成。\n月主转却风地包马几历领下回变便但存。\n正之格作已半步油越十值经必上白县在。\n",
                    "subtitle": "太一示与青府听使被路必难在消象值工包边物整员么来人本例么",
                    "title": "农任期以争素了教情小参展状百式或接",
                    "cover": "http://beta.images.fashionworldcn.com/8fa080f91b6340cd70008d7b4dc2027d2686b885.jpg",
                    "channel": {
                        "_id": "5923d5a2afa4194436827736",
                        "name": "Fashion TV",
                        "createAt": 1501080665133,
                        "publishAt": 1486464752660,
                        "priority": 4,
                        "cover": null
                    },
                    "category": {
                        "_id": "5978ac5997c46c20f1095478",
                        "channelId": "5923d5a2afa4194436827736",
                        "name": "拍摄花絮",
                        "createAt": 1501080665555,
                        "publishAt": 1483344628361,
                        "priority": 29,
                        "cover": null
                    },
                    "collections": 0,
                    "favourites": 0
                }
            ]
        },
        {
            "_id": "5978ac5997c46c20f109547a",
            "channelId": "5923d5a2afa4194436827736",
            "name": "品牌专题",
            "createAt": 1501080665561,
            "publishAt": 1488991310328,
            "priority": 28,
            "cover": null,
            "channel": {
                "_id": "5923d5a2afa4194436827736",
                "name": "Fashion TV",
                "createAt": 1501080665133,
                "publishAt": 1486464752660,
                "priority": 4,
                "cover": null
            },
            "videos": []
        },
        {
            "_id": "5978ac5997c46c20f109547c",
            "channelId": "5923d5a2afa4194436827736",
            "name": "泳装秀",
            "createAt": 1501080665565,
            "publishAt": 1505796121947,
            "priority": 27,
            "cover": null,
            "channel": {
                "_id": "5923d5a2afa4194436827736",
                "name": "Fashion TV",
                "createAt": 1501080665133,
                "publishAt": 1486464752660,
                "priority": 4,
                "cover": null
            },
            "videos": [
                {
                    "_id": "598e37da97c46c20f17ab7e9",
                    "categoryId": "5978ac5997c46c20f109547c",
                    "channelId": "5923d5a2afa4194436827736",
                    "definitions": [
                        {
                            "definition": "1080p",
                            "url": "http://beta.videos.fashionworldcn.com/ef649a6b6928d5268769f4288479fca3192c55c9.mp4"
                        },
                        {
                            "definition": "720p",
                            "url": "http://beta.videos.fashionworldcn.com/7bbfdbeaeab215fb7765e4212a918caa59da1016.mp4"
                        },
                        {
                            "definition": "480p",
                            "url": "http://beta.videos.fashionworldcn.com/2e9e77f3be4cf0f6f59d08c4e8da161493ed6bb1.mp4"
                        },
                        {
                            "definition": "360p",
                            "url": "http://beta.videos.fashionworldcn.com/a4cde296ae98380a816b117a0adf76feb8e53cae.mp4"
                        }
                    ],
                    "priority": 0,
                    "size": 71569473,
                    "duration": 180050,
                    "screenshots": [
                        "http://beta.images.fashionworldcn.com/1ae39f81b55133afdd730c5e2c2ca2d9ceab1421.jpg",
                        "http://beta.images.fashionworldcn.com/d8b6041e7f8486d2abcead2e90666fce4cb884d4.jpg",
                        "http://beta.images.fashionworldcn.com/e4972dec4c85d2b5c6456d634ac9f5b6443a33ea.jpg",
                        "http://beta.images.fashionworldcn.com/cecd42cdf79dbfd6503ae98d94298f970318d19f.jpg",
                        "http://beta.images.fashionworldcn.com/1d68f4b21c38c73fe8a17b032da23a7af0678857.jpg"
                    ],
                    "createAt": 1502492634230,
                    "recommendAt": null,
                    "publishAt": 1505701471378,
                    "keywords": [],
                    "tags": [
                        "通口按眼组山"
                    ],
                    "views": 500088,
                    "productionCountry": null,
                    "rightsOwner": null,
                    "year": null,
                    "castings": [],
                    "part": null,
                    "episode": null,
                    "season": null,
                    "summary": "理个证法你照西门红个安口消经以所需象。\n指适展需增称度高力指然由基。\n先家员共接标第文直实率本交济史过。\n派对育每给布品论记品省那研。\n华公广称清斯数子常持活深按它按很论。\n况国较界上战之东给据斯收。\n实队即保计收上界身六等条却图清书任多。\n空单料必世米用道林叫集也划放精本程。\n",
                    "abstract": "约达却火式素口半下候族步。\n九想正身才先生说结但被级特要。\n安手指构家且然九元数包金张更。\n必中决场四花表两省白按阶任六入。\n算织路周利海然干利红命比同。\n由厂都和口酸认适开单建需。\n维每热米步阶外照进布军选而习至社们酸。\n导期阶然北么斗或运战群有适细效提。\n类事间信传许满属转事压意斗。\n十广科越名及众群共斗省相断非中空技。\n技受资型内下军清动京间部定今回龙。\n原质强才年厂众教工的走电很多头。\n",
                    "subtitle": "关无或二争点很做说生化可并易政住情者题角其主直子话进示级住土百化务响发北能增真南很位数形该型较专日电厂做置同素期效长路说持之好反对号备交心中百改手收制任体九片社去主各指务领前电米候认性并复将近家复毛并电后解带之论派细精装般土设美我",
                    "title": "素它经光线清点效",
                    "cover": "http://beta.images.fashionworldcn.com/e4972dec4c85d2b5c6456d634ac9f5b6443a33ea.jpg",
                    "channel": {
                        "_id": "5923d5a2afa4194436827736",
                        "name": "Fashion TV",
                        "createAt": 1501080665133,
                        "publishAt": 1486464752660,
                        "priority": 4,
                        "cover": null
                    },
                    "category": {
                        "_id": "5978ac5997c46c20f109547c",
                        "channelId": "5923d5a2afa4194436827736",
                        "name": "泳装秀",
                        "createAt": 1501080665565,
                        "publishAt": 1505796121947,
                        "priority": 27,
                        "cover": null
                    },
                    "collections": 0,
                    "favourites": 0
                }
            ]
        },
        {
            "_id": "5978ac5997c46c20f1095480",
            "channelId": "5923d5a2afa4194436827736",
            "name": "美女",
            "createAt": 1501080665575,
            "publishAt": 1491023882998,
            "priority": 25,
            "cover": null,
            "channel": {
                "_id": "5923d5a2afa4194436827736",
                "name": "Fashion TV",
                "createAt": 1501080665133,
                "publishAt": 1486464752660,
                "priority": 4,
                "cover": null
            },
            "videos": [
                {
                    "_id": "598e0b2d97c46c20f17aa44e",
                    "categoryId": "5978ac5997c46c20f1095480",
                    "channelId": "5923d5a2afa4194436827736",
                    "definitions": [
                        {
                            "definition": "1080p",
                            "url": "http://beta.videos.fashionworldcn.com/47ccdb4d72646650c131aa4679a4d5b618deafb1.mp4"
                        },
                        {
                            "definition": "720p",
                            "url": "http://beta.videos.fashionworldcn.com/e84c0d87815f8e8ef38513f1842ac4d8dc275c69.mp4"
                        },
                        {
                            "definition": "480p",
                            "url": "http://beta.videos.fashionworldcn.com/f9c40e3460a656e53610d0599283b11107724143.mp4"
                        },
                        {
                            "definition": "360p",
                            "url": "http://beta.videos.fashionworldcn.com/f0ab79adceaed23bc18652e25fb750dd38faebe3.mp4"
                        }
                    ],
                    "priority": 0,
                    "size": 48598311,
                    "duration": 120080,
                    "screenshots": [
                        "http://beta.images.fashionworldcn.com/696d52974c5dd136d8da6502176753efd4845a99.jpg",
                        "http://beta.images.fashionworldcn.com/7fd4aaa88c69565e4ba84ba404d3fce05ae9802e.jpg",
                        "http://beta.images.fashionworldcn.com/7c3910b65c5ac3ccf2a3dc368dd2c76640bf6314.jpg",
                        "http://beta.images.fashionworldcn.com/230075675604f05e7d7adca1324bf94df21a3bb7.jpg",
                        "http://beta.images.fashionworldcn.com/b1b9956c7dedcf8dafd156e62074036717c0817c.jpg"
                    ],
                    "createAt": 1502481197537,
                    "recommendAt": null,
                    "publishAt": 1505701559163,
                    "keywords": [],
                    "tags": [
                        "非建候于学"
                    ],
                    "views": 500087,
                    "productionCountry": null,
                    "rightsOwner": null,
                    "year": null,
                    "castings": [],
                    "part": null,
                    "episode": null,
                    "season": null,
                    "summary": "工机山已种深走达示所科并周设新张。\n速效话五知什记六增果收军了受斗。\n斗况育片长平发心始意如也节子这为。\n达院拉门前先矿文法起义约易儿石比。\n子论包它或整主格实间然是回。\n农报复群干则问育小商本正分这子会采叫。\n者数体查命证织道将元目较况。\n放数把此变面较型流群发走政织教心。\n分起做易都划期率事连共世切治效。\n采复极办道飞第群始世路极认。\n广素及打不商等及步验各引知元。\n号月进得才至布流局色包区工党。\n知克音值才毛达应又国所实本属家消。\n然价面响等则深这而听调年进报斯节响。\n青空传代面常率开通花角委对家称也写。\n形低结层儿至点权政百较条。\n装习示热和最业片程住科求第。\n省万前路决确两决习相果学产原已。\n较提行备长一论立工往清相通状元。\n队图史温高周现值深别儿区外识局制。\n积养力意果百习单西入速多无高。\n产象边在设之次根置理治物多非加广程史。\n整写军设着求共知社最约适入。\n斯原象适习采明土张住极约少三适。\n争一这头如争名住江采部间近。\n准快报复程除使你照方级铁。\n目京社平期南它不便写半目好发除指直。\n性相红八见照年任叫七传边。\n东反研增出消带两律高素高按知社路。\n代点听解月消西万五拉观压。\n权世易内者育如区叫参路身地放从。\n候有它每教置确维次作交确几联者易适。\n",
                    "abstract": "产场众通北最指门入因说照省决。\n日定改集院格和听了石外品处。\n带界六维题马给国你设流正百属积全革。\n基改进代火再体温比么油适表条总员路。\n克天识采后动数件意子在但知。\n论原格元队别影提且管领表人后先都分层。\n研交效想广面入世极中群养图层名着。\n是两多老很识前还积务书得等同。\n受高加主元样国干劳任话相土油。\n矿清气北育式步她下支物命去连高放。\n",
                    "subtitle": "该识土名阶能人家油高种家感回些加山世际级见整按先老过其段质统劳事圆区北用放温由引儿京类一理市容却革军力很过外白器声养府性子斗统新总们",
                    "title": "员革省山细片地派记即根设土",
                    "cover": "http://beta.images.fashionworldcn.com/7c3910b65c5ac3ccf2a3dc368dd2c76640bf6314.jpg",
                    "channel": {
                        "_id": "5923d5a2afa4194436827736",
                        "name": "Fashion TV",
                        "createAt": 1501080665133,
                        "publishAt": 1486464752660,
                        "priority": 4,
                        "cover": null
                    },
                    "category": {
                        "_id": "5978ac5997c46c20f1095480",
                        "channelId": "5923d5a2afa4194436827736",
                        "name": "美女",
                        "createAt": 1501080665575,
                        "publishAt": 1491023882998,
                        "priority": 25,
                        "cover": null
                    },
                    "collections": 0,
                    "favourites": 0
                }
            ]
        }
    ]
}
```

[signature]: ../../../../signature.md

[channel-model]: ../../../../model/channel.md
[category-model]: ../../../../model/category.md
[video-model]: ../../../../model/video.md
