/* ----------------------------------------------------
 *  NVD3
 *    
 *  JavaScript file for charts.nvd3.html
 *  
 *  Description: Contains all the charting codes from NVD3
 *  Official Docs: http://nvd3.org/examples/index.html
 * ---------------------------------------------------- */


(function() {

	'use strict';


    /* ------------------------- 
        Begin Line Chart
     ------------------------- */

    // Generate Sin Cos Data
    // for the charts
    function sinAndCos() {
        var sin = [],
            sin2 = [],
            cos = [],
            rand = [],
            rand2 = [];

        for (var i = 0; i < 100; i++) {
            sin.push({x: i, y: i % 10 === 5 ? null : Math.sin(i/10) }); //the nulls are to show how defined works
            sin2.push({x: i, y: Math.sin(i/5) * 0.4 - 0.25});
            cos.push({x: i, y: 0.5 * Math.cos(i/10)});
            rand.push({x:i, y: Math.random() / 10});
            rand2.push({x: i, y: Math.cos(i/10) + Math.random() / 10 })
        };

        return [
            {
                area: true,
                values: sin,
                key: 'Sine Wave',
                color: '#ff7f0e',
                strokeWidth: 4,
                classed: 'dashed'
            },
            {
                values: cos,
                key: 'Cosine Wave',
                color: '#2ca02c'
            },
            {
                values: rand,
                key: 'Random Points',
                color: '#2222ff'
            },
            {
                values: rand2,
                key: 'Random Cosine',
                color: '#667711',
                strokeWidth: 3.5
            },
            {
                area: true,
                values: sin2,
                key: 'Fill opacity',
                color: '#EF9CFB',
                fillOpacity: .1
            }
        ];
    }

    
	// Line Chart
	// Wrapping in nv.addGraph allows for '0 timeout render', 
    // stores rendered charts in nv.graphs, and may do more in the future... it's NOT required
    var chart;
    var data;
    var randomizeFillOpacity = function() {
        var rand = Math.random(0,1);
        for (var i = 0; i < 100; i++) { // modify sine amplitude
            data[4].values[i].y = Math.sin(i/(5 + rand)) * 0.4 * rand - 0.25;
        }
        data[4].fillOpacity = rand;
        chart.update();
    };

    // Add Graph
    nv.addGraph(function() {
        chart = nv.models.lineChart()
            .options({
                duration: 300,
                useInteractiveGuideline: true
            })
        ;
        // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        chart.xAxis
            .axisLabel('Time (s)')
            .tickFormat(d3.format(',.1f'))
            .staggerLabels(true)
        ;
        chart.yAxis
            .axisLabel('Voltage (v)')
            .tickFormat(function(d) {
                if (d === null) {
                    return 'N/A';
                }
                return d3.format(',.2f')(d);
            })
        ;
        data = sinAndCos();
        d3.select('#line-chart svg')
            .datum(data)
            .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

    /* ------------------------- 
        End Line Chart
     ------------------------- */


    /* ------------------------- 
        Begin Area Chart
     ------------------------- */

    var histcatexplong = [
        {
            'key' : 'Consumer Staples' ,
            'values' : [ [ 1138683600000 , 7.2800122043237] , [ 1141102800000 , 7.1187787503354] , [ 1143781200000 , 8.351887016482] , [ 1146369600000 , 8.4156698763993] , [ 1149048000000 , 8.1673298604231] , [ 1151640000000 , 5.5132447126042] , [ 1154318400000 , 6.1152537710599] , [ 1156996800000 , 6.076765091942] , [ 1159588800000 , 4.6304473798646] , [ 1162270800000 , 4.6301068469402] , [ 1164862800000 , 4.3466656309389] , [ 1167541200000 , 6.830104897003] , [ 1170219600000 , 7.241633040029] , [ 1172638800000 , 7.1432372054153] , [ 1175313600000 , 10.608942063374] , [ 1177905600000 , 10.914964549494] , [ 1180584000000 , 10.933223880565] , [ 1183176000000 , 8.3457524851265] , [ 1185854400000 , 8.1078413081882] , [ 1188532800000 , 8.2697185922474] , [ 1191124800000 , 8.4742436475968] , [ 1193803200000 , 8.4994601179319] , [ 1196398800000 , 8.7387319683243] , [ 1199077200000 , 6.8829183612895] , [ 1201755600000 , 6.984133637885] , [ 1204261200000 , 7.0860136043287] , [ 1206936000000 , 4.3961787956053] , [ 1209528000000 , 3.8699674365231] , [ 1212206400000 , 3.6928925238305] , [ 1214798400000 , 6.7571718894253] , [ 1217476800000 , 6.4367313362344] , [ 1220155200000 , 6.4048441521454] , [ 1222747200000 , 5.4643833239669] , [ 1225425600000 , 5.3150786833374] , [ 1228021200000 , 5.3011272612576] , [ 1230699600000 , 4.1203601430809] , [ 1233378000000 , 4.0881783200525] , [ 1235797200000 , 4.1928665957189] , [ 1238472000000 , 7.0249415663205] , [ 1241064000000 , 7.006530880769] , [ 1243742400000 , 6.994835633224] , [ 1246334400000 , 6.1220222336254] , [ 1249012800000 , 6.1177436137653] , [ 1251691200000 , 6.1413396231981] , [ 1254283200000 , 4.8046006145874] , [ 1256961600000 , 4.6647600660544] , [ 1259557200000 , 4.544865006255] , [ 1262235600000 , 6.0488249316539] , [ 1264914000000 , 6.3188669540206] , [ 1267333200000 , 6.5873958262306] , [ 1270008000000 , 6.2281189839578] , [ 1272600000000 , 5.8948915746059] , [ 1275278400000 , 5.5967320482214] , [ 1277870400000 , 0.99784432084837] , [ 1280548800000 , 1.0950794175359] , [ 1283227200000 , 0.94479734407491] , [ 1285819200000 , 1.222093988688] , [ 1288497600000 , 1.335093106856] , [ 1291093200000 , 1.3302565104985] , [ 1293771600000 , 1.340824670897] , [ 1296450000000 , 0] , [ 1298869200000 , 0] , [ 1301544000000 , 0] , [ 1304136000000 , 0] , [ 1306814400000 , 0] , [ 1309406400000 , 0] , [ 1312084800000 , 0] , [ 1314763200000 , 0] , [ 1317355200000 , 4.4583692315] , [ 1320033600000 , 3.6493043348059] , [ 1322629200000 , 3.8610064091761] , [ 1325307600000 , 5.5144800685202] , [ 1327986000000 , 5.1750695220792] , [ 1330491600000 , 5.6710066952691] , [ 1333166400000 , 8.5658461590953] , [ 1335758400000 , 8.6135447714243] , [ 1338436800000 , 8.0231460925212]]
        } ,
        {
            'key' : 'Energy' ,
            'values' : [ [ 1138683600000 , 1.544303464167] , [ 1141102800000 , 1.4387289432421] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 1.328626801128] , [ 1154318400000 , 1.2874050802627] , [ 1156996800000 , 1.0872743105593] , [ 1159588800000 , 0.96042562635813] , [ 1162270800000 , 0.93139372870616] , [ 1164862800000 , 0.94432167305385] , [ 1167541200000 , 1.277750166208] , [ 1170219600000 , 1.2204893886811] , [ 1172638800000 , 1.207489123122] , [ 1175313600000 , 1.2490651414113] , [ 1177905600000 , 1.2593129913052] , [ 1180584000000 , 1.373329808388] , [ 1183176000000 , 0] , [ 1185854400000 , 0] , [ 1188532800000 , 0] , [ 1191124800000 , 0] , [ 1193803200000 , 0] , [ 1196398800000 , 0] , [ 1199077200000 , 0] , [ 1201755600000 , 0] , [ 1204261200000 , 0] , [ 1206936000000 , 0] , [ 1209528000000 , 0] , [ 1212206400000 , 0] , [ 1214798400000 , 0] , [ 1217476800000 , 0] , [ 1220155200000 , 0] , [ 1222747200000 , 1.4516108933695] , [ 1225425600000 , 1.1856025268225] , [ 1228021200000 , 1.3430470355439] , [ 1230699600000 , 2.2752595354509] , [ 1233378000000 , 2.4031560010523] , [ 1235797200000 , 2.0822430731926] , [ 1238472000000 , 1.5640902826938] , [ 1241064000000 , 1.5812873972356] , [ 1243742400000 , 1.9462448548894] , [ 1246334400000 , 2.9464870223957] , [ 1249012800000 , 3.0744699383222] , [ 1251691200000 , 2.9422304628446] , [ 1254283200000 , 2.7503075599999] , [ 1256961600000 , 2.6506701800427] , [ 1259557200000 , 2.8005425319977] , [ 1262235600000 , 2.6816184971185] , [ 1264914000000 , 2.681206271327] , [ 1267333200000 , 2.8195488011259] , [ 1270008000000 , 0] , [ 1272600000000 , 0] , [ 1275278400000 , 0] , [ 1277870400000 , 1.0687057346382] , [ 1280548800000 , 1.2539400544134] , [ 1283227200000 , 1.1862969445955] , [ 1285819200000 , 0] , [ 1288497600000 , 0] , [ 1291093200000 , 0] , [ 1293771600000 , 0] , [ 1296450000000 , 1.941972859484] , [ 1298869200000 , 2.1142247697552] , [ 1301544000000 , 2.3788590206824] , [ 1304136000000 , 2.5337302877545] , [ 1306814400000 , 2.3163370395199] , [ 1309406400000 , 2.0645451843195] , [ 1312084800000 , 2.1004446672411] , [ 1314763200000 , 3.6301875804303] , [ 1317355200000 , 2.454204664652] , [ 1320033600000 , 2.196082370894] , [ 1322629200000 , 2.3358418255202] , [ 1325307600000 , 0] , [ 1327986000000 , 0] , [ 1330491600000 , 0] , [ 1333166400000 , 0.39001201038526] , [ 1335758400000 , 0.30945472725559] , [ 1338436800000 , 0.31062439305591]]
        } ,
        {
            'key' : 'Financials' ,
            'values' : [ [ 1138683600000 , 13.356778764352] , [ 1141102800000 , 13.611196863271] , [ 1143781200000 , 6.895903006119] , [ 1146369600000 , 6.9939633271352] , [ 1149048000000 , 6.7241510257675] , [ 1151640000000 , 5.5611293669516] , [ 1154318400000 , 5.6086488714041] , [ 1156996800000 , 5.4962849907033] , [ 1159588800000 , 6.9193153169279] , [ 1162270800000 , 7.0016334389777] , [ 1164862800000 , 6.7865422443273] , [ 1167541200000 , 9.0006454225383] , [ 1170219600000 , 9.2233916171431] , [ 1172638800000 , 8.8929316009479] , [ 1175313600000 , 10.345937520404] , [ 1177905600000 , 10.075914677026] , [ 1180584000000 , 10.089006188111] , [ 1183176000000 , 10.598330295008] , [ 1185854400000 , 9.968954653301] , [ 1188532800000 , 9.7740580198146] , [ 1191124800000 , 10.558483060626] , [ 1193803200000 , 9.9314651823603] , [ 1196398800000 , 9.3997715873769] , [ 1199077200000 , 8.4086493387262] , [ 1201755600000 , 8.9698309085926] , [ 1204261200000 , 8.2778357995396] , [ 1206936000000 , 8.8585045600123] , [ 1209528000000 , 8.7013756413322] , [ 1212206400000 , 7.7933605469443] , [ 1214798400000 , 7.0236183483064] , [ 1217476800000 , 6.9873088186829] , [ 1220155200000 , 6.8031713070097] , [ 1222747200000 , 6.6869531315723] , [ 1225425600000 , 6.138256993963] , [ 1228021200000 , 5.6434994016354] , [ 1230699600000 , 5.495220262512] , [ 1233378000000 , 4.6885326869846] , [ 1235797200000 , 4.4524349883438] , [ 1238472000000 , 5.6766520778185] , [ 1241064000000 , 5.7675774480752] , [ 1243742400000 , 5.7882863168337] , [ 1246334400000 , 7.2666010034924] , [ 1249012800000 , 7.519182132226] , [ 1251691200000 , 7.849651451445] , [ 1254283200000 , 10.383992037985] , [ 1256961600000 , 9.0653691861818] , [ 1259557200000 , 9.6705248324159] , [ 1262235600000 , 10.856380561349] , [ 1264914000000 , 11.27452370892] , [ 1267333200000 , 11.754156529088] , [ 1270008000000 , 8.2870811422456] , [ 1272600000000 , 8.0210264360699] , [ 1275278400000 , 7.5375074474865] , [ 1277870400000 , 8.3419527338039] , [ 1280548800000 , 9.4197471818443] , [ 1283227200000 , 8.7321733185797] , [ 1285819200000 , 9.6627062648126] , [ 1288497600000 , 10.187962234549] , [ 1291093200000 , 9.8144201733476] , [ 1293771600000 , 10.275723361713] , [ 1296450000000 , 16.796066079353] , [ 1298869200000 , 17.543254984075] , [ 1301544000000 , 16.673660675084] , [ 1304136000000 , 17.963944353609] , [ 1306814400000 , 16.637740867211] , [ 1309406400000 , 15.84857094609] , [ 1312084800000 , 14.767303362182] , [ 1314763200000 , 24.778452182432] , [ 1317355200000 , 18.370353229999] , [ 1320033600000 , 15.2531374291] , [ 1322629200000 , 14.989600840649] , [ 1325307600000 , 16.052539160125] , [ 1327986000000 , 16.424390322793] , [ 1330491600000 , 17.884020741105] , [ 1333166400000 , 7.1424929577921] , [ 1335758400000 , 7.8076213051482] , [ 1338436800000 , 7.2462684949232]]
        } ,
        {
            'key' : 'Health Care' ,
            'values' : [ [ 1138683600000 , 14.212410956029] , [ 1141102800000 , 13.973193618249] , [ 1143781200000 , 15.218233920665] , [ 1146369600000 , 14.38210972745] , [ 1149048000000 , 13.894310878491] , [ 1151640000000 , 15.593086090032] , [ 1154318400000 , 16.244839695188] , [ 1156996800000 , 16.017088850646] , [ 1159588800000 , 14.183951830055] , [ 1162270800000 , 14.148523245697] , [ 1164862800000 , 13.424326059972] , [ 1167541200000 , 12.974450435753] , [ 1170219600000 , 13.23247041802] , [ 1172638800000 , 13.318762655574] , [ 1175313600000 , 15.961407746104] , [ 1177905600000 , 16.287714639805] , [ 1180584000000 , 16.246590583889] , [ 1183176000000 , 17.564505594809] , [ 1185854400000 , 17.872725373165] , [ 1188532800000 , 18.018998508757] , [ 1191124800000 , 15.584518016603] , [ 1193803200000 , 15.480850647181] , [ 1196398800000 , 15.699120036984] , [ 1199077200000 , 19.184281817226] , [ 1201755600000 , 19.691226605207] , [ 1204261200000 , 18.982314051295] , [ 1206936000000 , 18.707820309008] , [ 1209528000000 , 17.459630929761] , [ 1212206400000 , 16.500616076782] , [ 1214798400000 , 18.086324003979] , [ 1217476800000 , 18.929464156258] , [ 1220155200000 , 18.233728682084] , [ 1222747200000 , 16.315776297325] , [ 1225425600000 , 14.63289219025] , [ 1228021200000 , 14.667835024478] , [ 1230699600000 , 13.946993947308] , [ 1233378000000 , 14.394304684397] , [ 1235797200000 , 13.724462792967] , [ 1238472000000 , 10.930879035806] , [ 1241064000000 , 9.8339915513708] , [ 1243742400000 , 10.053858541872] , [ 1246334400000 , 11.786998438287] , [ 1249012800000 , 11.780994901769] , [ 1251691200000 , 11.305889670276] , [ 1254283200000 , 10.918452290083] , [ 1256961600000 , 9.6811395055706] , [ 1259557200000 , 10.971529744038] , [ 1262235600000 , 13.330210480209] , [ 1264914000000 , 14.592637568961] , [ 1267333200000 , 14.605329141157] , [ 1270008000000 , 13.936853794037] , [ 1272600000000 , 12.189480759072] , [ 1275278400000 , 11.676151385046] , [ 1277870400000 , 13.058852800017] , [ 1280548800000 , 13.62891543203] , [ 1283227200000 , 13.811107569918] , [ 1285819200000 , 13.786494560787] , [ 1288497600000 , 14.04516285753] , [ 1291093200000 , 13.697412447288] , [ 1293771600000 , 13.677681376221] , [ 1296450000000 , 19.961511864531] , [ 1298869200000 , 21.049198298158] , [ 1301544000000 , 22.687631094008] , [ 1304136000000 , 25.469010617433] , [ 1306814400000 , 24.883799437121] , [ 1309406400000 , 24.203843814248] , [ 1312084800000 , 22.138760964038] , [ 1314763200000 , 16.034636966228] , [ 1317355200000 , 15.394958944556] , [ 1320033600000 , 12.625642461969] , [ 1322629200000 , 12.973735699739] , [ 1325307600000 , 15.786018336149] , [ 1327986000000 , 15.227368020134] , [ 1330491600000 , 15.899752650734] , [ 1333166400000 , 18.994731295388] , [ 1335758400000 , 18.450055817702] , [ 1338436800000 , 17.863719889669]]
        } ,
        {
            'key' : 'Industrials' ,
            'values' : [ [ 1138683600000 , 7.1590087090398] , [ 1141102800000 , 7.1297210970108] , [ 1143781200000 , 5.5774588290586] , [ 1146369600000 , 5.4977254491156] , [ 1149048000000 , 5.5138153113634] , [ 1151640000000 , 4.3198084032122] , [ 1154318400000 , 3.9179295839125] , [ 1156996800000 , 3.8110093051479] , [ 1159588800000 , 5.5629020916939] , [ 1162270800000 , 5.7241673711336] , [ 1164862800000 , 5.4715049695004] , [ 1167541200000 , 4.9193763571618] , [ 1170219600000 , 5.136053947247] , [ 1172638800000 , 5.1327258759766] , [ 1175313600000 , 5.1888943925082] , [ 1177905600000 , 5.5191481293345] , [ 1180584000000 , 5.6093625614921] , [ 1183176000000 , 4.2706312987397] , [ 1185854400000 , 4.4453235132117] , [ 1188532800000 , 4.6228003109761] , [ 1191124800000 , 5.0645764756954] , [ 1193803200000 , 5.0723447230959] , [ 1196398800000 , 5.1457765818846] , [ 1199077200000 , 5.4067851597282] , [ 1201755600000 , 5.472241916816] , [ 1204261200000 , 5.3742740389688] , [ 1206936000000 , 6.251751933664] , [ 1209528000000 , 6.1406852153472] , [ 1212206400000 , 5.8164385627465] , [ 1214798400000 , 5.4255846656171] , [ 1217476800000 , 5.3738499417204] , [ 1220155200000 , 5.1815627753979] , [ 1222747200000 , 5.0305983235349] , [ 1225425600000 , 4.6823058607165] , [ 1228021200000 , 4.5941481589093] , [ 1230699600000 , 5.4669598474575] , [ 1233378000000 , 5.1249037357] , [ 1235797200000 , 4.3504421250742] , [ 1238472000000 , 4.6260881026002] , [ 1241064000000 , 5.0140402458946] , [ 1243742400000 , 4.7458462454774] , [ 1246334400000 , 6.0437019654564] , [ 1249012800000 , 6.4595216249754] , [ 1251691200000 , 6.6420468254155] , [ 1254283200000 , 5.8927271960913] , [ 1256961600000 , 5.4712108838003] , [ 1259557200000 , 6.1220254207747] , [ 1262235600000 , 5.5385935169255] , [ 1264914000000 , 5.7383377612639] , [ 1267333200000 , 6.1715976730415] , [ 1270008000000 , 4.0102262681174] , [ 1272600000000 , 3.769389679692] , [ 1275278400000 , 3.5301571031152] , [ 1277870400000 , 2.7660252652526] , [ 1280548800000 , 3.1409983385775] , [ 1283227200000 , 3.0528024863055] , [ 1285819200000 , 4.3126123157971] , [ 1288497600000 , 4.594654041683] , [ 1291093200000 , 4.5424126126793] , [ 1293771600000 , 4.7790043987302] , [ 1296450000000 , 7.4969154058289] , [ 1298869200000 , 7.9424751557821] , [ 1301544000000 , 7.1560736250547] , [ 1304136000000 , 7.9478117337855] , [ 1306814400000 , 7.4109214848895] , [ 1309406400000 , 7.5966457641101] , [ 1312084800000 , 7.165754444071] , [ 1314763200000 , 5.4816702524302] , [ 1317355200000 , 4.9893656089584] , [ 1320033600000 , 4.498385105327] , [ 1322629200000 , 4.6776090358151] , [ 1325307600000 , 8.1350814368063] , [ 1327986000000 , 8.0732769990652] , [ 1330491600000 , 8.5602340387277] , [ 1333166400000 , 5.1293714074325] , [ 1335758400000 , 5.2586794619016] , [ 1338436800000 , 5.1100853569977]]
        } ,
        {
            'key' : 'Utilities' ,
            'values' : [ [ 1138683600000 , 0] , [ 1141102800000 , 0] , [ 1143781200000 , 0] , [ 1146369600000 , 0] , [ 1149048000000 , 0] , [ 1151640000000 , 0] , [ 1154318400000 , 0] , [ 1156996800000 , 0] , [ 1159588800000 , 0] , [ 1162270800000 , 0] , [ 1164862800000 , 0] , [ 1167541200000 , 0] , [ 1170219600000 , 0] , [ 1172638800000 , 0] , [ 1175313600000 , 0] , [ 1177905600000 , 0] , [ 1180584000000 , 0] , [ 1183176000000 , 0] , [ 1185854400000 , 0] , [ 1188532800000 , 0] , [ 1191124800000 , 0] , [ 1193803200000 , 0] , [ 1196398800000 , 0] , [ 1199077200000 , 0] , [ 1201755600000 , 0] , [ 1204261200000 , 0] , [ 1206936000000 , 0] , [ 1209528000000 , 0] , [ 1212206400000 , 0] , [ 1214798400000 , 0] , [ 1217476800000 , 0] , [ 1220155200000 , 0] , [ 1222747200000 , 0] , [ 1225425600000 , 0] , [ 1228021200000 , 0] , [ 1230699600000 , 0] , [ 1233378000000 , 0] , [ 1235797200000 , 0] , [ 1238472000000 , 0] , [ 1241064000000 , 0] , [ 1243742400000 , 0] , [ 1246334400000 , 0] , [ 1249012800000 , 0] , [ 1251691200000 , 0] , [ 1254283200000 , 0] , [ 1256961600000 , 0] , [ 1259557200000 , 0] , [ 1262235600000 , 0] , [ 1264914000000 , 0] , [ 1267333200000 , 0] , [ 1270008000000 , 0] , [ 1272600000000 , 0] , [ 1275278400000 , 0] , [ 1277870400000 , 0] , [ 1280548800000 , 0] , [ 1283227200000 , 0] , [ 1285819200000 , 0] , [ 1288497600000 , 0] , [ 1291093200000 , 0] , [ 1293771600000 , 0] , [ 1296450000000 , 0] , [ 1298869200000 , 0] , [ 1301544000000 , 0] , [ 1304136000000 , 0] , [ 1306814400000 , 0] , [ 1309406400000 , 0] , [ 1312084800000 , 0] , [ 1314763200000 , 0] , [ 1317355200000 , 0] , [ 1320033600000 , 0] , [ 1322629200000 , 0] , [ 1325307600000 , 0] , [ 1327986000000 , 0] , [ 1330491600000 , 0] , [ 1333166400000 , 0] , [ 1335758400000 , 0] , [ 1338436800000 , 0]]
        }
    ];

    // Begin Chart
    var colors = d3.scale.category20();
    var chart;

    // Add the graph
    nv.addGraph(function() {
        chart = nv.models.stackedAreaChart()
            .useInteractiveGuideline(true)
            .x(function(d) { return d[0] })
            .y(function(d) { return d[1] })
            .controlLabels({stacked: 'Stacked'})
            .duration(300);
        chart.xAxis.tickFormat(function(d) { return d3.time.format('%x')(new Date(d)) });
        chart.yAxis.tickFormat(d3.format(',.2f'));
        chart.legend.vers('furious');
        d3.select('#area-chart svg')
            .datum(histcatexplong)
            .transition().duration(1000)
            .call(chart)
            .each('start', function() {
                setTimeout(function() {
                    d3.selectAll('#chart1 *').each(function() {
                        if(this.__transition__)
                            this.__transition__.duration = 1;
                    })
                }, 0)
            });
        nv.utils.windowResize(chart.update);
        return chart;
    });

    /* ------------------------- 
        End Area Chart
     ------------------------- */



    /* ------------------------- 
        Begin Bar Chart
     ------------------------- */

    // Data for Discrete Bar Chart
    var historicalBarChart = [
        {
            key: 'Cumulative Return',
            values: [
                {
                    'label' : 'A' ,
                    'value' : 29.765957771107
                } ,
                {
                    'label' : 'B' ,
                    'value' : 0
                } ,
                {
                    'label' : 'C' ,
                    'value' : 32.807804682612
                } ,
                {
                    'label' : 'D' ,
                    'value' : 196.45946739256
                } ,
                {
                    'label' : 'E' ,
                    'value' : 0.19434030906893
                } ,
                {
                    'label' : 'F' ,
                    'value' : 98.079782601442
                } ,
                {
                    'label' : 'G' ,
                    'value' : 13.925743130903
                } ,
                {
                    'label' : 'H' ,
                    'value' : 5.1387322875705
                }
            ]
        }
    ];

    // Add the chart to #discrete-bar-chart svg
    nv.addGraph(function() {
        var chart = nv.models.discreteBarChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .staggerLabels(true)
            //.staggerLabels(historicalBarChart[0].values.length > 8)
            .showValues(true)
            .duration(250)
            ;
        d3.select('#discrete-bar-chart svg')
            .datum(historicalBarChart)
            .call(chart);
        nv.utils.windowResize(chart.update);
        return chart;
    });

    /* ------------------------- 
        End Bar Chart
     ------------------------- */



    /* ------------------------- 
        Begin Stacked Chart
     ------------------------- */
    
    // Actual Data
    var negative_test_data = new d3.range(0,3).map(function(d,i) {
        return {
            key: 'Stream' + i,
            values: new d3.range(0,11).map( function(f,j) {
                return {
                    y: 10 + Math.random()*100 * (Math.floor(Math.random()*100)%2 ? 1 : -1),
                    x: j
                }
            })
        };
    });

    // Begin Chart
    var chart;
    nv.addGraph(function() {
        chart = nv.models.multiBarChart()
            .barColor(d3.scale.category20().range())
            .duration(300)
            .margin({bottom: 100, left: 70})
            .rotateLabels(45)
            .groupSpacing(0.1)
        ;
        chart.reduceXTicks(false).staggerLabels(true);
        chart.xAxis
            .axisLabel('ID of Furry Cat Households')
            .axisLabelDistance(35)
            .showMaxMin(false)
            .tickFormat(d3.format(',.2f'))
        ;
        chart.yAxis
            .axisLabel('Change in Furry Cat Population')
            .axisLabelDistance(-5)
            .tickFormat(d3.format(',.01f'))
        ;
        chart.dispatch.on('renderEnd', function(){
            nv.log('Render Complete');
        });
        d3.select('#grouped-stacked-chart svg')
            .datum(negative_test_data)
            .call(chart);
        nv.utils.windowResize(chart.update);
        chart.dispatch.on('stateChange', function(e) {
            nv.log('New State:', JSON.stringify(e));
        });
        chart.state.dispatch.on('change', function(state){
            nv.log('state', JSON.stringify(state));
        });
        return chart;
    });

    /* ------------------------- 
        End Stacked Chart
     ------------------------- */


    /* ------------------------- 
        Begin Line Focus Chart
     ------------------------- */

    // Add the graph using #line-focus-chart svg
    nv.addGraph(function() {
        var chart = nv.models.lineWithFocusChart();

        chart.brushExtent([50,70]);

        chart.xAxis.tickFormat(d3.format(',f')).axisLabel('Stream - 3,128,.1');
        chart.x2Axis.tickFormat(d3.format(',f'));

        chart.yTickFormat(d3.format(',.2f'));

        chart.useInteractiveGuideline(true);

        d3.select('#line-focus-chart svg')
            .datum(testData())
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });


    // Test Data for Line Chart
    function testData() {
        return stream_layers(3,128,.1).map(function(data, i) {
            return {
                key: 'Stream' + i,
                area: i === 1,
                values: data
            };
        });
    }

    /* ------------------------- 
        End Line Focus Chart
     ------------------------- */


    /* ------------------------- 
        Begin Candle Stick Chart
     ------------------------- */

    // Data for Candle Stick Chart
    var candle_data = [{values: [
            {'date': 15854, 'open': 165.42, 'high': 165.8, 'low': 164.34, 'close': 165.22, 'volume': 160363400, 'adjusted': 164.35},
            {'date': 15855, 'open': 165.35, 'high': 166.59, 'low': 165.22, 'close': 165.83, 'volume': 107793800, 'adjusted': 164.96},
            {'date': 15856, 'open': 165.37, 'high': 166.31, 'low': 163.13, 'close': 163.45, 'volume': 176850100, 'adjusted': 162.59},
            {'date': 15859, 'open': 163.83, 'high': 164.46, 'low': 162.66, 'close': 164.35, 'volume': 168390700, 'adjusted': 163.48},
            {'date': 15860, 'open': 164.44, 'high': 165.1, 'low': 162.73, 'close': 163.56, 'volume': 157631500, 'adjusted': 162.7},
            {'date': 15861, 'open': 163.09, 'high': 163.42, 'low': 161.13, 'close': 161.27, 'volume': 211737800, 'adjusted': 160.42},
            {'date': 15862, 'open': 161.2, 'high': 162.74, 'low': 160.25, 'close': 162.73, 'volume': 200225500, 'adjusted': 161.87},
            {'date': 15863, 'open': 163.85, 'high': 164.95, 'low': 163.14, 'close': 164.8, 'volume': 188337800, 'adjusted': 163.93},
            {'date': 15866, 'open': 165.31, 'high': 165.4, 'low': 164.37, 'close': 164.8, 'volume': 105667100, 'adjusted': 163.93},
            {'date': 15867, 'open': 163.3, 'high': 164.54, 'low': 162.74, 'close': 163.1, 'volume': 159505400, 'adjusted': 162.24},
            {'date': 15868, 'open': 164.22, 'high': 164.39, 'low': 161.6, 'close': 161.75, 'volume': 177361500, 'adjusted': 160.9},
            {'date': 15869, 'open': 161.66, 'high': 164.5, 'low': 161.3, 'close': 164.21, 'volume': 163587800, 'adjusted': 163.35},
            {'date': 15870, 'open': 164.03, 'high': 164.67, 'low': 162.91, 'close': 163.18, 'volume': 141197500, 'adjusted': 162.32},
            {'date': 15873, 'open': 164.29, 'high': 165.22, 'low': 163.22, 'close': 164.44, 'volume': 136295600, 'adjusted': 163.57},
            {'date': 15874, 'open': 164.53, 'high': 165.99, 'low': 164.52, 'close': 165.74, 'volume': 114695600, 'adjusted': 164.87},
            {'date': 15875, 'open': 165.6, 'high': 165.89, 'low': 163.38, 'close': 163.45, 'volume': 206149500, 'adjusted': 162.59},
            {'date': 15876, 'open': 161.86, 'high': 163.47, 'low': 158.98, 'close': 159.4, 'volume': 321255900, 'adjusted': 158.56},
            {'date': 15877, 'open': 159.64, 'high': 159.76, 'low': 157.47, 'close': 159.07, 'volume': 271956800, 'adjusted': 159.07},
            {'date': 15880, 'open': 157.41, 'high': 158.43, 'low': 155.73, 'close': 157.06, 'volume': 222329000, 'adjusted': 157.06},
            {'date': 15881, 'open': 158.48, 'high': 160.1, 'low': 157.42, 'close': 158.57, 'volume': 162262200, 'adjusted': 158.57},
            {'date': 15882, 'open': 159.87, 'high': 160.5, 'low': 159.25, 'close': 160.14, 'volume': 134848000, 'adjusted': 160.14},
            {'date': 15883, 'open': 161.1, 'high': 161.82, 'low': 160.95, 'close': 161.08, 'volume': 129483700, 'adjusted': 161.08},
            {'date': 15884, 'open': 160.63, 'high': 161.4, 'low': 159.86, 'close': 160.42, 'volume': 160402900, 'adjusted': 160.42},
            {'date': 15887, 'open': 161.26, 'high': 162.48, 'low': 161.08, 'close': 161.36, 'volume': 131954800, 'adjusted': 161.36},
            {'date': 15888, 'open': 161.12, 'high': 162.3, 'low': 160.5, 'close': 161.21, 'volume': 154863700, 'adjusted': 161.21},
            {'date': 15889, 'open': 160.48, 'high': 161.77, 'low': 160.22, 'close': 161.28, 'volume': 75216400, 'adjusted': 161.28},
            {'date': 15891, 'open': 162.47, 'high': 163.08, 'low': 161.3, 'close': 163.02, 'volume': 122416900, 'adjusted': 163.02},
            {'date': 15894, 'open': 163.86, 'high': 164.39, 'low': 163.08, 'close': 163.95, 'volume': 108092500, 'adjusted': 163.95},
            {'date': 15895, 'open': 164.98, 'high': 165.33, 'low': 164.27, 'close': 165.13, 'volume': 119298000, 'adjusted': 165.13},
            {'date': 15896, 'open': 164.97, 'high': 165.75, 'low': 164.63, 'close': 165.19, 'volume': 121410100, 'adjusted': 165.19},
            {'date': 15897, 'open': 167.11, 'high': 167.61, 'low': 165.18, 'close': 167.44, 'volume': 135592200, 'adjusted': 167.44},
            {'date': 15898, 'open': 167.39, 'high': 167.93, 'low': 167.13, 'close': 167.51, 'volume': 104212700, 'adjusted': 167.51},
            {'date': 15901, 'open': 167.97, 'high': 168.39, 'low': 167.68, 'close': 168.15, 'volume': 69450600, 'adjusted': 168.15},
            {'date': 15902, 'open': 168.26, 'high': 168.36, 'low': 167.07, 'close': 167.52, 'volume': 88702100, 'adjusted': 167.52},
            {'date': 15903, 'open': 168.16, 'high': 168.48, 'low': 167.73, 'close': 167.95, 'volume': 92873900, 'adjusted': 167.95},
            {'date': 15904, 'open': 168.31, 'high': 169.27, 'low': 168.2, 'close': 168.87, 'volume': 103620100, 'adjusted': 168.87},
            {'date': 15905, 'open': 168.52, 'high': 169.23, 'low': 168.31, 'close': 169.17, 'volume': 103831700, 'adjusted': 169.17},
            {'date': 15908, 'open': 169.41, 'high': 169.74, 'low': 169.01, 'close': 169.5, 'volume': 79428600, 'adjusted': 169.5},
            {'date': 15909, 'open': 169.8, 'high': 169.83, 'low': 169.05, 'close': 169.14, 'volume': 80829700, 'adjusted': 169.14},
            {'date': 15910, 'open': 169.79, 'high': 169.86, 'low': 168.18, 'close': 168.52, 'volume': 112914000, 'adjusted': 168.52},
            {'date': 15911, 'open': 168.22, 'high': 169.08, 'low': 167.94, 'close': 168.93, 'volume': 111088600, 'adjusted': 168.93},
            {'date': 15912, 'open': 168.22, 'high': 169.16, 'low': 167.52, 'close': 169.11, 'volume': 107814600, 'adjusted': 169.11},
            {'date': 15915, 'open': 168.68, 'high': 169.06, 'low': 168.11, 'close': 168.59, 'volume': 79695000, 'adjusted': 168.59},
            {'date': 15916, 'open': 169.1, 'high': 169.28, 'low': 168.19, 'close': 168.59, 'volume': 85209600, 'adjusted': 168.59},
            {'date': 15917, 'open': 168.94, 'high': 169.85, 'low': 168.49, 'close': 168.71, 'volume': 142388700, 'adjusted': 168.71},
            {'date': 15918, 'open': 169.99, 'high': 170.81, 'low': 169.9, 'close': 170.66, 'volume': 110438400, 'adjusted': 170.66},
            {'date': 15919, 'open': 170.28, 'high': 170.97, 'low': 170.05, 'close': 170.95, 'volume': 91116700, 'adjusted': 170.95},
            {'date': 15922, 'open': 170.57, 'high': 170.96, 'low': 170.35, 'close': 170.7, 'volume': 54072700, 'adjusted': 170.7},
            {'date': 15923, 'open': 170.37, 'high': 170.74, 'low': 169.35, 'close': 169.73, 'volume': 87495000, 'adjusted': 169.73},
            {'date': 15924, 'open': 169.19, 'high': 169.43, 'low': 168.55, 'close': 169.18, 'volume': 84854700, 'adjusted': 169.18},
            {'date': 15925, 'open': 169.98, 'high': 170.18, 'low': 168.93, 'close': 169.8, 'volume': 102181300, 'adjusted': 169.8},
            {'date': 15926, 'open': 169.58, 'high': 170.1, 'low': 168.72, 'close': 169.31, 'volume': 91757700, 'adjusted': 169.31},
            {'date': 15929, 'open': 168.46, 'high': 169.31, 'low': 168.38, 'close': 169.11, 'volume': 68593300, 'adjusted': 169.11},
            {'date': 15930, 'open': 169.41, 'high': 169.9, 'low': 168.41, 'close': 169.61, 'volume': 80806000, 'adjusted': 169.61},
            {'date': 15931, 'open': 169.53, 'high': 169.8, 'low': 168.7, 'close': 168.74, 'volume': 79829200, 'adjusted': 168.74},
            {'date': 15932, 'open': 167.41, 'high': 167.43, 'low': 166.09, 'close': 166.38, 'volume': 152931800, 'adjusted': 166.38},
            {'date': 15933, 'open': 166.06, 'high': 166.63, 'low': 165.5, 'close': 165.83, 'volume': 130868200, 'adjusted': 165.83},
            {'date': 15936, 'open': 165.64, 'high': 166.21, 'low': 164.76, 'close': 164.77, 'volume': 96437600, 'adjusted': 164.77},
            {'date': 15937, 'open': 165.04, 'high': 166.2, 'low': 164.86, 'close': 165.58, 'volume': 89294400, 'adjusted': 165.58},
            {'date': 15938, 'open': 165.12, 'high': 166.03, 'low': 164.19, 'close': 164.56, 'volume': 159530500, 'adjusted': 164.56},
            {'date': 15939, 'open': 164.9, 'high': 166.3, 'low': 164.89, 'close': 166.06, 'volume': 101471400, 'adjusted': 166.06},
            {'date': 15940, 'open': 166.55, 'high': 166.83, 'low': 165.77, 'close': 166.62, 'volume': 90888900, 'adjusted': 166.62},
            {'date': 15943, 'open': 166.79, 'high': 167.3, 'low': 165.89, 'close': 166, 'volume': 89702100, 'adjusted': 166},
            {'date': 15944, 'open': 164.36, 'high': 166, 'low': 163.21, 'close': 163.33, 'volume': 158619400, 'adjusted': 163.33},
            {'date': 15945, 'open': 163.26, 'high': 164.49, 'low': 163.05, 'close': 163.91, 'volume': 108113000, 'adjusted': 163.91},
            {'date': 15946, 'open': 163.55, 'high': 165.04, 'low': 163.4, 'close': 164.17, 'volume': 119200500, 'adjusted': 164.17},
            {'date': 15947, 'open': 164.51, 'high': 164.53, 'low': 163.17, 'close': 163.65, 'volume': 134560800, 'adjusted': 163.65},
            {'date': 15951, 'open': 165.23, 'high': 165.58, 'low': 163.7, 'close': 164.39, 'volume': 142322300, 'adjusted': 164.39},
            {'date': 15952, 'open': 164.43, 'high': 166.03, 'low': 164.13, 'close': 165.75, 'volume': 97304000, 'adjusted': 165.75},
            {'date': 15953, 'open': 165.85, 'high': 166.4, 'low': 165.73, 'close': 165.96, 'volume': 62930500, 'adjusted': 165.96}
        ]}];


    // Initiate the graph under #candlestick-chart svg
    nv.addGraph(function() {
        var chart = nv.models.candlestickBarChart()
            .x(function(d) { return d['date'] })
            .y(function(d) { return d['close'] })
            .duration(250)
            .margin({left: 75, bottom: 50});

        // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        chart.xAxis
                .axisLabel('Dates')
                .tickFormat(function(d) {
                    // make each value fall on a different date
                    return d3.time.format('%x')(new Date(new Date() - (20000 * 86400000) + (d * 86400000)));
                });

        chart.yAxis
                .axisLabel('Stock Price')
                .tickFormat(function(d,i){ return '$' + d3.format(',.1f')(d); });



        d3.select('#candlestick-chart svg')
                .datum(candle_data)
                .transition().duration(500)
                .call(chart);

        nv.utils.windowResize(chart.update);
        return chart;
    });

    /* ------------------------- 
        End Candle Stick Chart
     ------------------------- */



    /* ------------------------- 
        Begin Box Plot Chart
     ------------------------- */

    // Add the chart
    nv.addGraph(function() {
        var chart = nv.models.boxPlotChart()
                        .x(function(d) { return d.label })
                        .staggerLabels(true)
                        .maxBoxWidth(75) // prevent boxes from being incredibly wide
                        .yDomain([0, 500]);

        d3.select('#boxplot-chart svg')
            .datum(exampleData())
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });


    // Example Data for box plot
    function exampleData() {
        return  [
        {
            label: 'Sample A',
            values: {
                Q1: 120,
                Q2: 150,
                Q3: 200,
                whisker_low: 115,
                whisker_high: 210,
                outliers: [50, 100, 225]
            },
        },
        {
            label: 'Sample B',
            values: {
                Q1: 300,
                Q2: 350,
                Q3: 400,
                whisker_low: 225,
                whisker_high: 425,
                outliers: [175]
            },
        },
        {
            label: 'Sample C',
            values: {
                Q1: 50,
                Q2: 100,
                Q3: 125,
                whisker_low: 25,
                whisker_high: 175,
                outliers: [0]
            },
        }
        ];
    }

    /* ------------------------- 
        End Box Plot Chart
     ------------------------- */




    // Stream Data Generator
    /* Inspired by Lee Byron's test data generator. */
    function stream_layers(n, m, o) {
        if (arguments.length < 3) o = 0;
        function bump(a) {
            var x = 1 / (.1 + Math.random()),
            y = 2 * Math.random() - .5,
            z = 10 / (.1 + Math.random());
            for (var i = 0; i < m; i++) {
                var w = (i / m - y) * z;
                a[i] += x * Math.exp(-w * w);
            }
        }
        return d3.range(n).map(function() {
            var a = [], i;
            for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                for (i = 0; i < 5; i++) bump(a);
                    return a.map(stream_index);
            });
    }

    /* Another layer generator using gamma distributions. */
    function stream_waves(n, m) {
        return d3.range(n).map(function(i) {
            return d3.range(m).map(function(j) {
                var x = 20 * j / m - i / 3;
                return 2 * x * Math.exp(-.5 * x);
            }).map(stream_index);
        });
    }

    function stream_index(d, i) {
        return {x: i, y: Math.max(0, d)};
    }

})();