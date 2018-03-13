const Insight = require('../lib').Insight;
const fs = require('fs');
const path = require('path');
const ast = require('enki-content');

const insightsPath = 'fixtures/insights';

let testInsights = [];


describe('Insight', () => {
    beforeAll(() => {
        for (let file of fs.readdirSync(path.join(__dirname, insightsPath))) {
            let contentPath = path.join(__dirname, `${insightsPath}/${file}`);
            let body = fs.readFileSync(contentPath, 'utf8');
            testInsights.push(new Insight({body , path : contentPath}));
        }
    });


    test('parses the title from the raw insight text', () => {
        testInsights.forEach((insight)=>{
            expect(insight).toHaveProperty('title')
        });
    
        let titles = testInsights.map((insight) => {return insight.title});

        expect(titles).toEqual(expect.arrayContaining([
            'Declaring Functions',
            'Immediately-Invoked Function Expression (IIFE)',
            'Multiple JOINs',
            'UNION',
            'Using `curl` To Make HTTP Requests',
            'Using `ping` To Measure Network Latency'
        ]));
    });
    
    test('parses the slug from the filename', () => {
        testInsights.forEach((insight) => {
          expect(insight).toHaveProperty('slug')
        });
    
        let slugs = testInsights.map((insight) => {return insight.slug});
    
        expect(slugs).toEqual(expect.arrayContaining([
          'multiple-joins',
          'union',
          'using-curl-to-make-http-requests',
          'using-ping-to-measure-network-latency',
          'declaring-functions',
          'immediately-invoked-function-expression-iife'
        ]));
    });

    test('parses the content section from the raw insight text', () => {
        testInsights.forEach((insight) => {
          expect(insight).toHaveProperty('content')
        });
    
        let contentArr = testInsights.map((insight) => {return insight.content});
        //Hardcoded, expected data
        expect(contentArr).toEqual(expect.arrayContaining([ 'JavaScript supports a number of different ways of declaring functions.\n\nThe most common is the *function declaration*:\n\n```\n//function to add 2 parameters\nfunction add(x, y){\n\treturn x + y;\n}\n\nadd(1,2);//3\n```\n* *Return Values**\n\nIn the above example we specified that we would return the function argument x plus argument y. \n\nIf we did not specify a return value in the above example then the function would return *undefined* e.g.\n\n``` \nfunction add(x, y){\n\tx + y;\n}\n\nadd(1,2);//undefined\n```\n\nNote that there are some more complex cases where a function will not return *undefined* when no return is specified.',
            'It is easy to configure *Gulp* to use an external configuration file. \n\nThis is a great way to keep settings organised, versioned, accessible by other build tools and distinct from the build process.\n\nCreate a file called *config.json* to hold the settings:\n```\n{\n   "destination" : "wwwroot\\\\"\n}\n```\n\nThen in *gulpfile.js* import *config.json* as you would any other module:\n\n```\nvar gulp   = require(\'gulp\');\nvar config = require(\'./config.json\');\n```\n\nWe can now access properties on the config object easily and use them in Gulp tasks:\n```\ngulp.task(\'get-destination\', function() {\n   console.log(config.destination);\n});\n```',
            'As stated before, **React** components behave just like functions, taking `props` as input and returning **React elements**. \n\nSimple `component`s that don\'t have an internal `state` and don\'t make use of any **lifecycle** methods such as `constructor()` can be written as **functional components**.\n\nConsider the component:\n```jsx\nclass Enki extends React.Component {\n  render() {\n    return <p>{this.props.enki}</p>;\n  }\n}\n```\n\nA **stateless** component is **functional** when written literally as a `JS` function:\n```jsx\nfunction Enki(props) {\n  return <p>{props.enki}</p>;\n}\n```\n\nThe two components defined above are completely equivalent from **React**\'s point of view.\n* *Functional components** are preferred for **UI** because they enforce the best practice of having *dumb presentational components*, but also require less typing (e.g. no `this` keyword).',
            'A common pattern in JavaScript is the Immediately-Invoked Function Expression or IIFE.\n\nIIFE\'s are nameless or anonymous functions that are executed immediately.\n\nThey have the following structure:\n\n```\n(function(){\n   ...\n})();\n```\n\nThe main benefit of IIFE\'s is restricting access to variables contained within.\n\nWhen a function runs it creates its own execution context and by creating a function and running it immediately we ensure that the variables contained are inaccessible to external code.\n\nIIFE\'s are a very useful approach for organising code and frequently used in libraries and frameworks.',
            'The `LEFT JOIN`, or `LEFT OUTER JOIN`, is a type of join whose result contains **all** rows in the first table, regardless of whether there\'s a match with the right-hand table. Conversely, the `RIGHT JOIN`, or `RIGHT OUTER JOIN`, returns all rows in the second table. The keyword here is *outer*, which means "preserve the whole table".\n\nIn case of a `LEFT JOIN`, if the joined field has no match in the second table, the right-hand table columns values are defaulted to `NULL`. The same rule applies for the `RIGHT JOIN`\'s unmatched rows.\n\nA `LEFT JOIN` is performed like this:\n```SQL\nSELECT move.id, move.name,\n  type.id, type.name AS type_name\nFROM move\nLEFT OUTER JOIN type ON\nmove.type_id = type.id;\n```\nBelow, there\'s a visual representation of what the output of the command should contain:\n\n![leftjoin](%3Csvg%20width%3D%22100%25%22%20height%3D%22auto%22%20viewBox%3D%220%200%20276%20202%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3EGroup%204%3C%2Ftitle%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20transform%3D%22translate%2843%201%29%22%20stroke-width%3D%222%22%20stroke%3D%22%23FFF%22%3E%3Ccircle%20cx%3D%2260.5%22%20cy%3D%2260.5%22%20r%3D%2260.5%22%20fill%3D%22currentColor%22%2F%3E%3Ccircle%20cx%3D%22130.5%22%20cy%3D%2260.5%22%20r%3D%2260.5%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M138.5%2012.146C153.932%2023.109%20164%2041.129%20164%2061.5s-10.068%2038.39-25.5%2049.354C123.068%2099.891%20113%2081.871%20113%2061.5s10.068-38.39%2025.5-49.354z%22%20stroke%3D%22%23FFF%22%20stroke-width%3D%222%22%2F%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20fill%3D%22%23FFF%22%20transform%3D%22translate%280%201%29%22%3E%3Ctspan%20x%3D%2274%22%20y%3D%2269%22%3EA%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20fill%3D%22%23FFF%22%20transform%3D%22translate%280%201%29%22%3E%3Ctspan%20x%3D%22131%22%20y%3D%2269%22%3EC%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20fill%3D%22%23FFF%22%20transform%3D%22translate%280%201%29%22%3E%3Ctspan%20x%3D%22190%22%20y%3D%2269%22%3EB%3C%2Ftspan%3E%3C%2Ftext%3E%3Cg%20fill%3D%22%23FFF%22%3E%3Ctext%20font-family%3D%22Roboto-Light%2C%20Roboto%22%20font-size%3D%2215.5%22%20font-weight%3D%22300%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%2219%22%20y%3D%2219%22%3E%3A%20move%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Light%2C%20Roboto%22%20font-size%3D%2215.5%22%20font-weight%3D%22300%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%2219%22%20y%3D%2275%22%3E%3A%20move.type_id%20%3D%20type.id%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Light%2C%20Roboto%22%20font-size%3D%2215.5%22%20font-weight%3D%22300%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%2219%22%20y%3D%2247%22%3E%3A%20type%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%220%22%20y%3D%2222%22%3EA%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%220%22%20y%3D%2278%22%3EC%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%220%22%20y%3D%2250%22%3EB%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E)\n\nThe first row of the 640 rows result:\n```\nid | name  | id | type_name   \n===+=======+====+==========\n1  | pound | 1  | normal\n```\nThe equivalent `RIGHT OUTER JOIN`:\n```SQL\nSELECT move.id, move.name,\n  type.id, type.name AS type_name\nFROM move\nRIGHT OUTER JOIN type ON\nmove.type_id = type.id;\n```\nYields the same first row (of 640 rows):\n```\nid | name  | id | type_name   \n===+=======+====+===========\n1  | pound | 1  | normal\n```\nConversely, the `RIGHT JOIN` representation is this:\n\n![rightjoin](%3Csvg%20width%3D%22100%25%22%20height%3D%22auto%22%20viewBox%3D%220%200%20276%20202%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3EGroup%204%3C%2Ftitle%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20transform%3D%22translate%2843%201%29%22%20stroke-width%3D%222%22%20stroke%3D%22%23FFF%22%3E%3Ccircle%20cx%3D%2260.5%22%20cy%3D%2260.5%22%20r%3D%2260.5%22%2F%3E%3Ccircle%20cx%3D%22130.5%22%20cy%3D%2260.5%22%20r%3D%2260.5%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M138.5%2012.146C153.932%2023.109%20164%2041.129%20164%2061.5s-10.068%2038.39-25.5%2049.354C123.068%2099.891%20113%2081.871%20113%2061.5s10.068-38.39%2025.5-49.354z%22%20stroke%3D%22%23FFF%22%20stroke-width%3D%222%22%2F%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20fill%3D%22%23FFF%22%20transform%3D%22translate%280%201%29%22%3E%3Ctspan%20x%3D%2274%22%20y%3D%2269%22%3EA%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20fill%3D%22%23FFF%22%20transform%3D%22translate%280%201%29%22%3E%3Ctspan%20x%3D%22131%22%20y%3D%2269%22%3EC%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20fill%3D%22%23FFF%22%20transform%3D%22translate%280%201%29%22%3E%3Ctspan%20x%3D%22190%22%20y%3D%2269%22%3EB%3C%2Ftspan%3E%3C%2Ftext%3E%3Cg%20fill%3D%22%23FFF%22%3E%3Ctext%20font-family%3D%22Roboto-Light%2C%20Roboto%22%20font-size%3D%2215.5%22%20font-weight%3D%22300%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%2219%22%20y%3D%2219%22%3E%3A%20move%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Light%2C%20Roboto%22%20font-size%3D%2215.5%22%20font-weight%3D%22300%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%2219%22%20y%3D%2275%22%3E%3A%20move.type_id%20%3D%20type.id%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Light%2C%20Roboto%22%20font-size%3D%2215.5%22%20font-weight%3D%22300%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%2219%22%20y%3D%2247%22%3E%3A%20type%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%220%22%20y%3D%2222%22%3EA%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%220%22%20y%3D%2278%22%3EC%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%220%22%20y%3D%2250%22%3EB%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E)\n\n\nThere shouldn\'t be any difference between the two outputs as every Pokémon, move, type or item is already in the game and `NULL` entries would probably break everything. However, if there was a move without a type in the DB (for the left join) or a type for which there are no moves (for the right join), the output would look like this:\n```\n# Left Join\nid  |        name       | id | type_name\n====+===================+====+===========\n1234| coolest-move-ever | NULL  | NULL\n\n# Right Join\nid    | name | id  | type_name   \n======+======+=====+============\nNULL  | NULL | 19  | wood\n```',
            'Sometimes, a single join might not be enough to get the desired result. In `many-to-many` relationships, when an intermediate table is used to avoid data duplication, such practice is common.\n\nIn the Pokémon database you can find multiple intermediate tables, usually named `table1_table2`: for the `pokemon` and `type` tables, the intermediate one is named `pokemon_type`. Same goes for `pokemon`, `move` and `pokemon_move`.\n\nThese are some table entries which contain only the columns relevant to the query. The `pokemon` table:\n```\nid   |   name\n=====+============\n1    |  bulbasaur\n2    |  ivysaur\n3    |  venusaur\n```\nThe `pokemon_type` table:\n```\nid   |  slot  | pokemon_id | type_id\n=====+========+============+===========\n1    |   1    |      1     |     12\n2    |   2    |      1     |     4\n3    |   1    |      2     |     12\n4    |   2    |      2     |     4\n5    |   1    |      3     |     12\n6    |   2    |      3     |     4\n```\nAnd the `type` table:\n```\nid   |  name\n=====+=========\n1    |  normal\n...\n4    |  poison\n...\n12   |  grass\n```\nThe syntax is this:\n```SQL\nSELECT pokemon.name, type.name\nFROM pokemon_type\nLEFT JOIN pokemon\nON pokemon_type.pokemon_id = pokemon.id\nLEFT JOIN type\nON pokemon_type.type_id = type.id;\n```\nThis is effectively join the first two tables (*pokemon_type* and *pokemon*) and then join the resulting table with the *type* table.\n\nThese are the first four rows of output (out of 1225):\n```\nname        | name\n============+==========\nbulbasaur   | grass\nbulbasaur   | poison\nivysaur     | grass\nivysaur     | poison\n```\nThe same result can be achieved by using subqueries.',
            '* *Successful status codes** start with the digit `2`. They inform the client that the server has received and accepted a request. Moreover, in case of a `200` **OK** status code, the result of the request will be delivered as the payload of the response.\n\nData returned depends of the method used for the request:\n- `GET` - resource requested is sent to the client\n- `HEAD` - the same header as for the `GET` request is returned\n- `POST` - entity describing or containing the result is returned\n- `TRACE` - the same message as received by the server is sent back\n\nNot all `2xx` codes, however, mean that the request has been completed. For example, the `202` **Accepted** message states that the request has been queued for processing or is still processing. Even though not mandatory, the response should contain an indication of when the user can expect the request to be completed.\n\nOther status codes indicating the **success** of a request are:\n- `204` **No Content**: successful, but no message body in the response\n- `205` **Reset Content**: tells the user agent[1] to refresh the page from which the request originated\n- `206` **Partial Content**: indicates the response is only partial',
            'The **union** of two or more tables means combining their **type-matching rows**. Unlike the `JOIN` operation, which combines columns (containing all entries from either the left, the right or both tables), the `UNION` operation always retrieves every entry in *both tables*.\n\nHowever, there are two necessary conditions for a `UNION` to be performed:\n    - each union query must have the same number of columns\n    - every *nth* column must have the same type in all union queries\n\nFor example, the following union will fail:\n```SQL\nSELECT *\nFROM language\nUNION\nSELECT *\nFROM language_name;\n/* ERROR:  each UNION query must have\n the same number of columns\n LINE 4: SELECT *  */\n\n```\nAs well as the next one:\n```SQL\nSELECT id, name\nFROM language\nUNION\nSELECT id, language_id\nfrom language_name;\n/* ERROR:  UNION types text and bigint\n cannot be matched\n LINE 4: SELECT id, language_id   */\n```\nChanging `language_id` to `name` fixes the errors:\n```SQL\nSELECT id, name\nFROM language\nUNION\nSELECT id, name\nfrom language_name;\n```\nWith the output:\n```\nid |       name       \n===+============\n16 | Chinese\n35 | Englisch\n 2 | roomaji\n29 | 伊語\n9  | en\n26 | Espagnol\n\n(51 rows)\n```\n\n### UNION ALL\n\nBy default, `UNION` returns only **distinct** values. If you need all occurrences of the items, use `UNION ALL`. In the above example, the tables won\'t contain any duplicates: if we were to change the last query to include the `ALL` keyword, the number of total rows will stay the same:\n```SQL\nSELECT id, name\nFROM language\nUNION ALL\nSELECT id, name\nfrom language_name;\n```\nAnd the output:\n```\nid  |       name       \n====+============\n  1 | ja\n  2 | roomaji\n  3 | ko\n  4 | zh\n  5 | fr\n  6 | de\n  7 | es\n  8 | it\n  9 | en\n(51 rows)\n```\n\nFor tables where data singularity is not always the case, the results might be different. An immediate consequence of this is that `UNION` performs worse, as it must scan the result for duplicates.',
            'Virtually every Unix system comes with the `curl` command pre-installed.  `curl` allows us to simulate any HTTP request, although most commonly it\'s used to download files and webpages from the command-line.\n\nHere\'s a quick example:\n\n```console\n$ curl http://google.com\n<HTML><HEAD>\n<TITLE>301 Moved</TITLE></HEAD><BODY>\n<H1>301 Moved</H1>\nThe document has moved\n<A HREF="http://www.google.com/">here</A>.\n</BODY></HTML>\n$\n```\n\nHere, `curl` is fetching the contents of `http://google.com` and printing out whatever we receive in response.  In this case, we receive an HTML document telling us go to `http://www.google.com` instead.  A normal browser would follow this redirect automatically, so as a user we\'d never see this page.\n\nIf we ask `curl` to fetch something other than text it will still try to print out its contents to the console, resulting in gibberish.\n\n### Saving Output From `curl`\n\nThere are two main ways to save the output from curl: using `>` redirection or using the `-o` option.\n\n```console\n$ curl http://foo.com/bar.mp3 > song.mp3\n$ curl -o song.mp3 http://foo.com/bar.mp3\n```\n\nBoth of these will result in `curl` downloading `bar.mp3` and writing it to the `song.mp3` file in the current directory.',
            'The `ping` command will continuously send a tiny bit of internet traffic to a remote address and report the amount of time it took to receive a response.  It will also report if the traffic was dropped, which is indicative of a bad network connection or a misconfigured network. The `ping` command one of the most basic and essential tools for diagnosing network problems.\n\nHere is an example:\n\n```console\n$ ping google.com\nPING google.com (172.217.0.238)\n  56(84) bytes of data.\n64 bytes from 172.217.0.238:\n  icmp_seq=1 ttl=56 time=0.849 ms\n64 bytes from 172.217.0.238:\n  icmp_seq=2 ttl=56 time=0.822 ms\n64 bytes from 172.217.0.238:\n  icmp_seq=3 ttl=56 time=0.905 ms\n64 bytes from 172.217.0.238:\n  icmp_seq=4 ttl=56 time=0.894 ms\n64 bytes from 172.217.0.238:\n  icmp_seq=5 ttl=56 time=0.888 ms\n=== google.com ping statistics ===\n5 packets transmitted, 5 received,\n  0% packet loss, time 4001ms\nrtt min/avg/max/mdev =\n  0.822/0.871/0.905/0.044 ms\n$\n```\n\nThe `ping` command will continue to do this until it is stopped.  The `time=` field is the most important.  This particular machine is getting a response back from `google.com` in about 1 millisecond, which is very fast.  `ping` will also give an overall summary of the "ping session", which includes the number of ping packets sent, the percentage of packets lost, and various statistics about the round trip time (`rtt`).\n\nKeep in mind that latency has to do with both the quality of your connection and the physical distance between the machine on which you issue the `ping` command and the machine being pinged.\n\nFor example, if I ping `www.duma.ru`, the website for the Russian State Parliament (Duma), we get much higher ping times:\n\n```console\n$ ping duma.ru\nPING duma.ru (212.11.128.31)\n  56(84) bytes of data.\n64 bytes from duma.ru (212.11.128.31):\n  icmp_seq=1 ttl=113 time=149 ms\n64 bytes from duma.ru (212.11.128.31):\n  icmp_seq=2 ttl=113 time=149 ms\n64 bytes from duma.ru (212.11.128.31):\n  icmp_seq=3 ttl=113 time=149 ms\n64 bytes from duma.ru (212.11.128.31):\n  icmp_seq=4 ttl=113 time=149 ms\n=== duma.ru ping statistics ===\n5 packets transmitted, 4 received,\n  20% packet loss, time 4005ms\nrtt min/avg/max/mdev =\n  149.660/149.811/149.946/0.484 ms\n$\n```',
            'In git you can tag a certain point in history as being important. You can use this to mark a new **version**.\n\nYou can create an **annotated** tag by:\n```\n$ git tag -a v1.0.1 -m "Version 1.0.1"\n```\nAnnotated tags contain useful information: the current commit checksum, your name and email, the date and the tagging message.\n\nYou can also create a **lightweight** tag which acts just as a pointer to the current commit:\n```\n$ git tag v1.0.l\n```\nYou can add a tag to an **older** commit by specifying part of its commit checksum, for example:\n```\n$ git tag -a v.1.0.0 4682c32\n```\n\nYou can list all the tags you have made in **alphabetical** order:\n```\n$ git tag\nv0.1\nv0.9\nv1.5\n```\nIf your project has hundreds of tags, you can also search for **specific** tags, for example those of version `v1.0`:\n```\ngit tag -l "v1.0*"\nv1.0.0\nv1.0.1\nv1.0.2\nv1.0.3\n```' ]
    ));
    });

    test('parses the content section from the raw insight text with image', () => {
        testInsights.forEach((insight) => {
            expect(insight).toHaveProperty('content')
        });
      
        let contentArr = testInsights.map((insight) => {return insight.content});
        
        expect(contentArr).toEqual(expect.arrayContaining([
            'The __Open Systems Interconnection Model__ (OSI Model) is a model for standardizing networks across various hardware configurations.\n\n![alt description](%3Csvg%20viewBox%3D%22-78%20-46%20476%20560%22%20width%3D%22476%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20height%3D%22560%22%3E%3Cdefs%3E%3Cpath%20id%3D%22a%22%20d%3D%22M-3.56%20225l-.23-4.08-.84-3.93-1.31-3.23-1.62-2.93-2.16-2.46-2.3-2-2.7-1.16-3-.38%203-.24%202.7-1.23%202.3-1.69%202.16-2.7%201.62-3%201.3-3.23.85-3.85.23-4.24%22%20stroke%3D%22%23fff%22%20fill%3D%22%23fff%22%2F%3E%3Cpath%20id%3D%22b%22%20fill%3D%22none%22%20stroke%3D%22%237c7c7c%22%20d%3D%22M-3.56%20225l-.23-4.08-.84-3.93-1.31-3.23-1.62-2.93-2.16-2.46-2.3-2-2.7-1.16-3-.38%203-.24%202.7-1.23%202.3-1.69%202.16-2.7%201.62-3%201.3-3.23.85-3.85.23-4.24%22%2F%3E%3C%2Fdefs%3E%3Crect%20height%3D%22100%25%22%20width%3D%22100%25%22%20y%3D%22-46%22%20x%3D%22-78%22%20fill%3D%22%23fff%22%2F%3E%3Cg%20fill%3D%22none%22%3E%3Crect%20ry%3D%225%22%20height%3D%22192%22%20width%3D%2230.95%22%20stroke%3D%22%237c7c7c%22%20y%3D%22283.04%22%20x%3D%22-22.3%22%20stroke-width%3D%222%22%20class%3D%22bracket%22%2F%3E%3Crect%20ry%3D%226%22%20height%3D%22257.77%22%20width%3D%2230.95%22%20stroke%3D%22%237c7c7c%22%20y%3D%22-4.02%22%20x%3D%22-21.95%22%20stroke-width%3D%222%22%20class%3D%22bracket%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%22212.09%22%20width%3D%22360.12%22%20stroke%3D%22%23b2b2b2%22%20y%3D%22272.97%22%20x%3D%228.95%22%20stroke-width%3D%226%22%20class%3D%22outline%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%22278.17%22%20width%3D%22360.12%22%20stroke%3D%22%23b2b2b2%22%20y%3D%22-14.02%22%20x%3D%228.94%22%20stroke-width%3D%226%22%20class%3D%22outline%22%2F%3E%3C%2Fg%3E%3Cg%20stroke-width%3D%222%22%20stroke%3D%22%23000%22%20stroke-opacity%3D%22.4%22%20paint-order%3D%22stroke%22%3E%3Cg%20fill%3D%22%23c4db80%22%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22120%22%20y%3D%22-4.07%22%20x%3D%2218.98%22%20class%3D%22col1%20row1%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22220%22%20y%3D%22-4.07%22%20x%3D%22138.98%22%20class%3D%22col2%20row1%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22120%22%20y%3D%2261.93%22%20x%3D%2218.98%22%20class%3D%22col1%20row2%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22220%22%20y%3D%2261.93%22%20x%3D%22138.98%22%20class%3D%22col2%20row2%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22120%22%20y%3D%22127.93%22%20x%3D%2218.98%22%20class%3D%22col1%20row3%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22220%22%20y%3D%22127.93%22%20x%3D%22138.98%22%20class%3D%22col2%20row3%22%2F%3E%3C%2Fg%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22120%22%20y%3D%22193.93%22%20x%3D%2218.98%22%20class%3D%22col1%20row4%22%20fill%3D%22%23e0e97f%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22220%22%20y%3D%22193.93%22%20x%3D%22138.98%22%20class%3D%22col2%20row4%22%20fill%3D%22%23e0e97f%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22120%22%20y%3D%22283.03%22%20x%3D%2219.04%22%20class%3D%22col1%20row5%22%20fill%3D%22%23f0e17f%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22220%22%20y%3D%22283.03%22%20x%3D%22139.04%22%20class%3D%22col2%20row5%22%20fill%3D%22%23f0e17f%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22120%22%20y%3D%22349.03%22%20x%3D%2219.04%22%20class%3D%22col1%20row6%22%20fill%3D%22%23edc27f%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22220%22%20y%3D%22349.03%22%20x%3D%22139.04%22%20class%3D%22col2%20row6%22%20fill%3D%22%23edc27f%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22120%22%20y%3D%22415.03%22%20x%3D%2219.04%22%20class%3D%22col1%20row7%22%20fill%3D%22%23dca27f%22%2F%3E%3Crect%20ry%3D%2217.64%22%20height%3D%2260%22%20width%3D%22220%22%20y%3D%22415.03%22%20x%3D%22139.04%22%20class%3D%22col2%20row7%22%20fill%3D%22%23dca27f%22%2F%3E%3C%2Fg%3E%3Cuse%20y%3D%22-80%22%20x%3D%22-17%22%20xlink%3Ahref%3D%22%23a%22%2F%3E%3Cuse%20xlink%3Ahref%3D%22%23b%22%20stroke%3D%22%237c7c7c%22%20y%3D%22-80%22%20x%3D%22-18.4%22%20stroke-width%3D%221.9%22%20fill%3D%22none%22%2F%3E%3Cuse%20y%3D%22176%22%20x%3D%22-17%22%20xlink%3Ahref%3D%22%23a%22%2F%3E%3Cuse%20xlink%3Ahref%3D%22%23b%22%20stroke%3D%22%237c7c7c%22%20y%3D%22176%22%20x%3D%22-18.4%22%20stroke-width%3D%221.9%22%20fill%3D%22none%22%2F%3E%3Cswitch%20font-size%3D%2218.06%22%20font-family%3D%22Arial%2Csans-serif%22%3E%3Cg%20systemLanguage%3D%22it%22%20text-anchor%3D%22middle%22%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%2280%22%3Eunit%C3%A0%20di%20dato%3C%2Ftext%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%22250%22%3Elivelli%3C%2Ftext%3E%3Ctext%20y%3D%2231.39%22%20x%3D%2278.98%22%3EDati%3C%2Ftext%3E%3Ctext%20y%3D%2297.39%22%20x%3D%2278.98%22%3EDati%3C%2Ftext%3E%3Ctext%20y%3D%22163.39%22%20x%3D%2278.98%22%3EDati%3C%2Ftext%3E%3Ctext%20y%3D%22229.39%22%20x%3D%2278.98%22%3ESegmenti%3C%2Ftext%3E%3Ctext%20y%3D%22318.49%22%20x%3D%2279.04%22%3EPacchetti%3C%2Ftext%3E%3Ctext%20y%3D%22384.49%22%20x%3D%2279.04%22%3ETrame%3C%2Ftext%3E%3Ctext%20y%3D%22450.49%22%20x%3D%2279.04%22%3EBit%3C%2Ftext%3E%3Ctext%20y%3D%2218%22%20x%3D%22248.98%22%3E%3Ctspan%3EApplicazione%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Edal%20processo%20di%20rete%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Eall%26apos%3Bapplicazione%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%2282%22%20x%3D%22248.98%22%3E%3Ctspan%3EPresentazione%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Erappresentazione%20dei%20dati%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ee%20criptazione%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22150%22%20x%3D%22248.98%22%3E%3Ctspan%3ESessione%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2222%22%3Ecomunicazione%20inter-host%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22214%22%20x%3D%22248.98%22%3E%3Ctspan%3ETrasporto%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Econnessioni%20end-to-end%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ee%20affidabilit%C3%A0%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22303%22%20x%3D%22249.04%22%3E%3Ctspan%3ERete%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Edeterminazione%20dei%20percorsi%20e%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Eindirizzamento%20logico%20%28IP%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22369%22%20x%3D%22249.04%22%3E%3Ctspan%3ECollegamento%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Eindirizzamento%20fisico%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3E%28MAC%20e%20LLC%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22435%22%20x%3D%22249.04%22%3E%3Ctspan%3EFisico%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Emezzo%2C%20segnale%20e%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Etrasmissione%20binaria%3C%2Ftspan%3E%3C%2Ftext%3E%3Cg%20font-size%3D%2224.06%22%3E%3Ctext%20y%3D%22127%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20127%29%22%3ELivelli%20degli%20host%3C%2Ftext%3E%3Ctext%20y%3D%22384%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20384%29%22%3ELivelli%20dei%20mezzi%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20systemLanguage%3D%22ro%22%20text-anchor%3D%22middle%22%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%2280%22%3Eunitate%20de%20date%3C%2Ftext%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%22250%22%3Eniveluri%3C%2Ftext%3E%3Ctext%20y%3D%2231.39%22%20x%3D%2278.98%22%3EDate%3C%2Ftext%3E%3Ctext%20y%3D%2297.39%22%20x%3D%2278.98%22%3EDate%3C%2Ftext%3E%3Ctext%20y%3D%22163.39%22%20x%3D%2278.98%22%3EDate%3C%2Ftext%3E%3Ctext%20y%3D%22229.39%22%20x%3D%2278.98%22%3ESegmente%3C%2Ftext%3E%3Ctext%20y%3D%22318.49%22%20x%3D%2279.04%22%3EPachete%3C%2Ftext%3E%3Ctext%20y%3D%22384.49%22%20x%3D%2279.04%22%3ECadre%3C%2Ftext%3E%3Ctext%20y%3D%22450.49%22%20x%3D%2279.04%22%3EBi%C8%9Bi%3C%2Ftext%3E%3Ctext%20y%3D%2218%22%20x%3D%22248.98%22%3E%3Ctspan%3EAplica%C8%9Bie%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ede%20la%20procesulde%20re%C8%9Bea%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ela%26apos%3Baplica%C8%9Bie%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%2282%22%20x%3D%22248.98%22%3E%3Ctspan%3EPrezentare%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ereprezentarea%20datelor%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3E%C8%99i%20criptare%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22150%22%20x%3D%22248.98%22%3E%3Ctspan%3ESesiune%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2222%22%3Ecomunicare%20%C3%AEntre%20hosturi%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22214%22%20x%3D%22248.98%22%3E%3Ctspan%3ETrasport%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Econexiuni%20end-to-end%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3E%C8%99i%20fiabilitate%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22303%22%20x%3D%22249.04%22%3E%3Ctspan%3ERe%C8%9Bea%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Edeterminarea%20rutelor%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3E%C8%99i%20adresare%20logic%C4%83%20%28IP%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22369%22%20x%3D%22249.04%22%3E%3Ctspan%3ELeg%C4%83tur%C4%83%20de%20date%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Eadresare%20fizic%C4%83%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3E%28MAC%20%C8%99i%20LLC%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22435%22%20x%3D%22249.04%22%3E%3Ctspan%3EFizic%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Emediu%2C%20semnal%20%C8%99i%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Etransmisiune%20binar%C4%83%3C%2Ftspan%3E%3C%2Ftext%3E%3Cg%20font-size%3D%2224.06%22%3E%3Ctext%20y%3D%22127%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20127%29%22%3ENiveluri%20ale%20hostului%3C%2Ftext%3E%3Ctext%20y%3D%22384%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20384%29%22%3ENiveluri%20are%20mediului%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20systemLanguage%3D%22cs%22%20text-anchor%3D%22middle%22%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%2280%22%3Edata%3C%2Ftext%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%22250%22%3Evrstva%3C%2Ftext%3E%3Ctext%20y%3D%2231.39%22%20x%3D%2278.98%22%3EData%3C%2Ftext%3E%3Ctext%20y%3D%2297.39%22%20x%3D%2278.98%22%3EData%3C%2Ftext%3E%3Ctext%20y%3D%22163.39%22%20x%3D%2278.98%22%3EData%3C%2Ftext%3E%3Ctext%20y%3D%22229.39%22%20x%3D%2278.98%22%3ESegmenty%3C%2Ftext%3E%3Ctext%20y%3D%22318.49%22%20x%3D%2279.04%22%3EPakety%3C%2Ftext%3E%3Ctext%20y%3D%22384.49%22%20x%3D%2279.04%22%3ER%C3%A1mce%3C%2Ftext%3E%3Ctext%20y%3D%22450.49%22%20x%3D%2279.04%22%3EBity%3C%2Ftext%3E%3Ctext%20y%3D%2218%22%20x%3D%22248.98%22%3E%3Ctspan%3EAplika%C4%8Dn%C3%AD%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2222%22%3Es%C3%AD%C5%A5ov%C3%BD%20proces%20aplikac%C3%AD%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%2282%22%20x%3D%22248.98%22%3E%3Ctspan%3EPrezenta%C4%8Dn%C3%AD%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2222%22%3Eprezentace%20dat%20a%20%C5%A1ifrov%C3%A1n%C3%AD%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22150%22%20x%3D%22248.98%22%3E%3Ctspan%3ERela%C4%8Dn%C3%AD%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ekomunikace%20mezi%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ehostitely%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22214%22%20x%3D%22248.98%22%3E%3Ctspan%3ETransportn%C3%AD%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3EEnd-to-End%20spojen%C3%AD%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ea%20spolehlivost%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22303%22%20x%3D%22249.04%22%3E%3Ctspan%3ES%C3%AD%C5%A5ov%C3%A1%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Eur%C4%8Dov%C3%A1n%C3%AD%20cesty%20a%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Elogick%C3%A9%20adresov%C3%A1n%C3%AD%20%28IP%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22369%22%20x%3D%22249.04%22%3E%3Ctspan%3ESpojov%C3%A1%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Efyzick%C3%A9%20adresov%C3%A1n%C3%AD%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3E%28MAC%20a%20LLC%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22435%22%20x%3D%22249.04%22%3E%3Ctspan%3EFyzick%C3%A1%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2222%22%3Em%C3%A9dium%2C%20sign%C3%A1l%2C%20bin%C3%A1rn%C3%AD%20p%C5%99enos%3C%2Ftspan%3E%3C%2Ftext%3E%3Cg%20font-size%3D%2224.06%22%3E%3Ctext%20y%3D%22127%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20127%29%22%3EVrstvy%20hostitel%C5%AF%3C%2Ftext%3E%3Ctext%20y%3D%22384%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20384%29%22%3EVrstvy%20m%C3%A9dia%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20systemLanguage%3D%22sv%22%20text-anchor%3D%22middle%22%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%2280%22%3Edata%3C%2Ftext%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%22250%22%3Eskikt%3C%2Ftext%3E%3Ctext%20y%3D%2231.39%22%20x%3D%2278.98%22%3EData%3C%2Ftext%3E%3Ctext%20y%3D%2297.39%22%20x%3D%2278.98%22%3EData%3C%2Ftext%3E%3Ctext%20y%3D%22163.39%22%20x%3D%2278.98%22%3EData%3C%2Ftext%3E%3Ctext%20y%3D%22229.39%22%20x%3D%2278.98%22%3ESegment%3C%2Ftext%3E%3Ctext%20y%3D%22318.49%22%20x%3D%2279.04%22%3EPaket%3C%2Ftext%3E%3Ctext%20y%3D%22384.49%22%20x%3D%2279.04%22%3ERamar%3C%2Ftext%3E%3Ctext%20y%3D%22450.49%22%20x%3D%2279.04%22%3EBitar%3C%2Ftext%3E%3Ctext%20y%3D%2218%22%20x%3D%22248.98%22%3E%3Ctspan%3EApplikation%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3En%C3%A4tverksprocess%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Etill%20applikation%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%2282%22%20x%3D%22248.98%22%3E%3Ctspan%3EPresentation%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Edataframst%C3%A4llning%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Eoch%20kryptering%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22150%22%20x%3D%22248.98%22%3E%3Ctspan%3ESession%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Emellanv%C3%A4rdslig%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ekommunikationssamordning%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22214%22%20x%3D%22248.98%22%3E%3Ctspan%3ETransport%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Es%C3%A4ndning%2C%20mottagning%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Eoch%20ankomstkontroll%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22303%22%20x%3D%22249.04%22%3E%3Ctspan%3EN%C3%A4tverk%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Enavigering%20och%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Elogisk%20adressering%20%28IP%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22369%22%20x%3D%22249.04%22%3E%3Ctspan%3EDatal%C3%A4nk%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Efysisk%20adressering%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3E%28MAC%20och%20LLC%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22435%22%20x%3D%22249.04%22%3E%3Ctspan%3EFysiskt%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Emedia%2C%20signal%20och%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ebin%C3%A4r%20%C3%B6verf%C3%B6ring%3C%2Ftspan%3E%3C%2Ftext%3E%3Cg%20font-size%3D%2224.06%22%3E%3Ctext%20y%3D%22127%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20127%29%22%3EV%C3%A4rdskikt%3C%2Ftext%3E%3Ctext%20y%3D%22384%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20384%29%22%3EMediumskikt%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20systemLanguage%3D%22es%22%20text-anchor%3D%22middle%22%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%2280%22%3Edata%20unit%3C%2Ftext%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%22250%22%3Elayers%3C%2Ftext%3E%3Ctext%20y%3D%2231.39%22%20x%3D%2278.98%22%3EData%3C%2Ftext%3E%3Ctext%20y%3D%2297.39%22%20x%3D%2278.98%22%3EData%3C%2Ftext%3E%3Ctext%20y%3D%22163.39%22%20x%3D%2278.98%22%3EData%3C%2Ftext%3E%3Ctext%20y%3D%22229.39%22%20x%3D%2278.98%22%3ESegments%3C%2Ftext%3E%3Ctext%20y%3D%22318.49%22%20x%3D%2279.04%22%3EPackets%3C%2Ftext%3E%3Ctext%20y%3D%22384.49%22%20x%3D%2279.04%22%3EFrames%3C%2Ftext%3E%3Ctext%20y%3D%22450.49%22%20x%3D%2279.04%22%3EBits%3C%2Ftext%3E%3Ctext%20y%3D%2218%22%20x%3D%22248.98%22%3E%3Ctspan%3ENivel%20de%20Aplicaci%C3%B3n%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2222%22%3Eservicios%20de%20red%20a%20aplicaciones%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%2282%22%20x%3D%22248.98%22%3E%3Ctspan%3ENivel%20de%20Presentaci%C3%B3n%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2222%22%3Erepresentaci%C3%B3n%20de%20los%20datos%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22150%22%20x%3D%22248.98%22%3E%3Ctspan%3ENivel%20de%20Sesi%C3%B3n%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ecomunicaci%C3%B3n%20entre%20dispositivos%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ede%20la%20red%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22214%22%20x%3D%22248.98%22%3E%3Ctspan%3ENivel%20de%20Transporte%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Econexi%C3%B3n%20extremo-a-extremo%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ey%20fiabilidad%20de%20los%20datos%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22303%22%20x%3D%22249.04%22%3E%3Ctspan%3ENivel%20de%20Red%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Edeterminaci%C3%B3n%20de%20ruta%20e%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Edireccionamiento%20l%C3%B3gico%20%28IP%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22369%22%20x%3D%22249.04%22%3E%3Ctspan%3ENivel%20de%20Enlace%20de%20Datos%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Edireccionamiento%20f%C3%ADsico%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3E%28MAC%20y%20LLC%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22435%22%20x%3D%22249.04%22%3E%3Ctspan%3ENivel%20F%C3%ADsico%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2222%22%3Ese%C3%B1al%20y%20transmisi%C3%B3n%20binaria%3C%2Ftspan%3E%3C%2Ftext%3E%3Cg%20font-size%3D%2224.06%22%3E%3Ctext%20y%3D%22127%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20127%29%22%3EHost%20Layers%3C%2Ftext%3E%3Ctext%20y%3D%22384%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20384%29%22%3EMedia%20Layers%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20systemLanguage%3D%22sk%22%20text-anchor%3D%22middle%22%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%2280%22%3Ed%C3%A1ta%3C%2Ftext%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%22250%22%3Evrstva%3C%2Ftext%3E%3Ctext%20y%3D%2231.39%22%20x%3D%2278.98%22%3ED%C3%A1ta%3C%2Ftext%3E%3Ctext%20y%3D%2297.39%22%20x%3D%2278.98%22%3ED%C3%A1ta%3C%2Ftext%3E%3Ctext%20y%3D%22163.39%22%20x%3D%2278.98%22%3ED%C3%A1ta%3C%2Ftext%3E%3Ctext%20y%3D%22229.39%22%20x%3D%2278.98%22%3ESegmenty%3C%2Ftext%3E%3Ctext%20y%3D%22318.49%22%20x%3D%2279.04%22%3EPakety%3C%2Ftext%3E%3Ctext%20y%3D%22384.49%22%20x%3D%2279.04%22%3ER%C3%A1mce%3C%2Ftext%3E%3Ctext%20y%3D%22450.49%22%20x%3D%2279.04%22%3EBity%3C%2Ftext%3E%3Ctext%20y%3D%2218%22%20x%3D%22248.98%22%3E%3Ctspan%3EAplika%C4%8Dn%C3%A1%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2222%22%3Esie%C5%A5ov%C3%BD%20proces%20aplik%C3%A1cii%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%2282%22%20x%3D%22248.98%22%3E%3Ctspan%3EPrezenta%C4%8Dn%C3%A1%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ereprezent%C3%A1cia%20d%C3%A1t%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ea%20kryptovanie%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22150%22%20x%3D%22248.98%22%3E%3Ctspan%3ERela%C4%8Dn%C3%A1%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ekomunik%C3%A1cia%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Emedzi%20strojmi%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22214%22%20x%3D%22248.98%22%3E%3Ctspan%3ETransportn%C3%A1%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3EEnd-to-end%20spojenia%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ea%20spo%C4%BEahlivos%C5%A5%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22303%22%20x%3D%22249.04%22%3E%3Ctspan%3ESie%C5%A5ov%C3%A1%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Eur%C4%8Dovanie%20cesty%20a%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Elogick%C3%A9%20adresovanie%20%28IP%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22369%22%20x%3D%22249.04%22%3E%3Ctspan%3ESpojov%C3%A1%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Efyzick%C3%A9%20adresovanie%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3E%28MAC%20a%20LLC%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22435%22%20x%3D%22249.04%22%3E%3Ctspan%3EFyzick%C3%A1%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Em%C3%A9dium%2C%20sign%C3%A1l%2C%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Ebin%C3%A1rny%20prenos%3C%2Ftspan%3E%3C%2Ftext%3E%3Cg%20font-size%3D%2224.06%22%3E%3Ctext%20y%3D%22127%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20127%29%22%3EVrstvy%20stroja%3C%2Ftext%3E%3Ctext%20y%3D%22384%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20384%29%22%3EVrstvy%20m%C3%A9dia%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20systemLanguage%3D%22fr%22%20text-anchor%3D%22middle%22%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%2280%22%3Eunit%C3%A9%20de%20donn%C3%A9es%3C%2Ftext%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%22250%22%3Ecouches%3C%2Ftext%3E%3Ctext%20y%3D%2231.39%22%20x%3D%2278.98%22%3EDonn%C3%A9e%3C%2Ftext%3E%3Ctext%20y%3D%2297.39%22%20x%3D%2278.98%22%3EDonn%C3%A9e%3C%2Ftext%3E%3Ctext%20y%3D%22163.39%22%20x%3D%2278.98%22%3EDonn%C3%A9e%3C%2Ftext%3E%3Ctext%20y%3D%22229.39%22%20x%3D%2278.98%22%3ESegment%3C%2Ftext%3E%3Ctext%20y%3D%22318.49%22%20x%3D%2279.04%22%3EPaquet%3C%2Ftext%3E%3Ctext%20y%3D%22384.49%22%20x%3D%2279.04%22%3ETrame%3C%2Ftext%3E%3Ctext%20y%3D%22450.49%22%20x%3D%2279.04%22%3EBit%3C%2Ftext%3E%3Ctext%20y%3D%2218%22%20x%3D%22248.98%22%3E%3Ctspan%3E7%20-%20Application%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2222%22%3EPoint%20d%26apos%3Bacc%C3%A8s%20aux%20services%20r%C3%A9seau%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%2282%22%20x%3D%22248.98%22%3E%3Ctspan%3E6%20-%20Pr%C3%A9sentation%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3EConversion%20et%20chiffrement%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Edes%20donn%C3%A9es%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22150%22%20x%3D%22248.98%22%3E%3Ctspan%3E5%20-%20Session%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2222%22%3ECommunication%20Interhost%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22214%22%20x%3D%22248.98%22%3E%3Ctspan%3E4%20-%20Transport%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3EConnexion%20de%20bout%20en%20bout%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Eet%20contr%C3%B4le%20de%20flux%20%28TCP%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22303%22%20x%3D%22249.04%22%3E%3Ctspan%3E3%20-%20R%C3%A9seau%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3ED%C3%A9termine%20le%20parcours%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Eet%20l%26apos%3Badressage%20logique%20%28IP%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22369%22%20x%3D%22249.04%22%3E%3Ctspan%3E2%20-%20Liaison%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3EAdressage%20physique%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3E%28MAC%20et%20LLC%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22435%22%20x%3D%22249.04%22%3E%3Ctspan%3E1%20-%20Physique%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3ETransmission%20binaire%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Enum%C3%A9rique%20ou%20analogique%3C%2Ftspan%3E%3C%2Ftext%3E%3Cg%20font-size%3D%2224.06%22%3E%3Ctext%20y%3D%22127%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20127%29%22%3ECouches%20hautes%3C%2Ftext%3E%3Ctext%20y%3D%22384%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20384%29%22%3ECouches%20mat%C3%A9rielles%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20text-anchor%3D%22middle%22%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%2280%22%3Edata%20unit%3C%2Ftext%3E%3Ctext%20y%3D%22-26.31%22%20x%3D%22250%22%3Elayers%3C%2Ftext%3E%3Ctext%20y%3D%2231.39%22%20x%3D%2278.98%22%3EData%3C%2Ftext%3E%3Ctext%20y%3D%2297.39%22%20x%3D%2278.98%22%3EData%3C%2Ftext%3E%3Ctext%20y%3D%22163.39%22%20x%3D%2278.98%22%3EData%3C%2Ftext%3E%3Ctext%20y%3D%22229.39%22%20x%3D%2278.98%22%3ESegments%3C%2Ftext%3E%3Ctext%20y%3D%22318.49%22%20x%3D%2279.04%22%3EPackets%3C%2Ftext%3E%3Ctext%20y%3D%22384.49%22%20x%3D%2279.04%22%3EFrames%3C%2Ftext%3E%3Ctext%20y%3D%22450.49%22%20x%3D%2279.04%22%3EBits%3C%2Ftext%3E%3Ctext%20y%3D%2218%22%20x%3D%22248.98%22%3E%3Ctspan%3EApplication%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2222%22%3ENetwork%20Process%20to%20Application%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%2282%22%20x%3D%22248.98%22%3E%3Ctspan%3EPresentation%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3EData%20Representation%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Eand%20Encryption%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22150%22%20x%3D%22248.98%22%3E%3Ctspan%3ESession%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2222%22%3EInterhost%20Communication%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22214%22%20x%3D%22248.98%22%3E%3Ctspan%3ETransport%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3EEnd-to-End%20Connections%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3Eand%20Reliability%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22303%22%20x%3D%22249.04%22%3E%3Ctspan%3ENetwork%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3EPath%20Determination%20and%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3ELogical%20Addressing%20%28IP%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22369%22%20x%3D%22249.04%22%3E%3Ctspan%3EData%20Link%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3EPhysical%20Addressing%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3E%28MAC%20and%20LLC%29%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20y%3D%22435%22%20x%3D%22249.04%22%3E%3Ctspan%3EPhysical%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3EMedia%2C%20Signal%20and%3C%2Ftspan%3E%20%3Ctspan%20x%3D%22248.98%22%20font-size%3D%2210pt%22%20dy%3D%2216%22%3EBinary%20Transmission%3C%2Ftspan%3E%3C%2Ftext%3E%3Cg%20font-size%3D%2224.06%22%3E%3Ctext%20y%3D%22127%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20127%29%22%3EHost%20Layers%3C%2Ftext%3E%3Ctext%20y%3D%22384%22%20x%3D%22-50%22%20transform%3D%22rotate%28-90%20-50%20384%29%22%3EMedia%20Layers%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fswitch%3E%3C%2Fsvg%3E)\n###### **Note:** _Layers labeled \'Media\' are physical and layers labeled \'Host\' are conceptual_\n\nThe model is displayed as a stack to show that each Layer requires every other layer below it to function, but does not need _any_ of the layers above it to function. For example the bottom-most layer (the Physical Layer) is the physical wiring needed to transmit electrical current throughout the network. All the services above it need this to function, but the physical wires themselves do not have any dependencies.\n\n\nThe following lessons will go into detail about the responsibilities of each layer and how it functions in a network. No two networks are the same, and as such the goal of the OSI Model is to be less of a hard rule and more of a flexible guideline.',
            'The `LEFT JOIN`, or `LEFT OUTER JOIN`, is a type of join whose result contains **all** rows in the first table, regardless of whether there\'s a match with the right-hand table. Conversely, the `RIGHT JOIN`, or `RIGHT OUTER JOIN`, returns all rows in the second table. The keyword here is *outer*, which means "preserve the whole table".\n\nIn case of a `LEFT JOIN`, if the joined field has no match in the second table, the right-hand table columns values are defaulted to `NULL`. The same rule applies for the `RIGHT JOIN`\'s unmatched rows.\n\nA `LEFT JOIN` is performed like this:\n```SQL\nSELECT move.id, move.name,\n  type.id, type.name AS type_name\nFROM move\nLEFT OUTER JOIN type ON\nmove.type_id = type.id;\n```\nBelow, there\'s a visual representation of what the output of the command should contain:\n\n![leftjoin](%3Csvg%20width%3D%22100%25%22%20height%3D%22auto%22%20viewBox%3D%220%200%20276%20202%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3EGroup%204%3C%2Ftitle%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20transform%3D%22translate%2843%201%29%22%20stroke-width%3D%222%22%20stroke%3D%22%23FFF%22%3E%3Ccircle%20cx%3D%2260.5%22%20cy%3D%2260.5%22%20r%3D%2260.5%22%20fill%3D%22currentColor%22%2F%3E%3Ccircle%20cx%3D%22130.5%22%20cy%3D%2260.5%22%20r%3D%2260.5%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M138.5%2012.146C153.932%2023.109%20164%2041.129%20164%2061.5s-10.068%2038.39-25.5%2049.354C123.068%2099.891%20113%2081.871%20113%2061.5s10.068-38.39%2025.5-49.354z%22%20stroke%3D%22%23FFF%22%20stroke-width%3D%222%22%2F%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20fill%3D%22%23FFF%22%20transform%3D%22translate%280%201%29%22%3E%3Ctspan%20x%3D%2274%22%20y%3D%2269%22%3EA%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20fill%3D%22%23FFF%22%20transform%3D%22translate%280%201%29%22%3E%3Ctspan%20x%3D%22131%22%20y%3D%2269%22%3EC%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20fill%3D%22%23FFF%22%20transform%3D%22translate%280%201%29%22%3E%3Ctspan%20x%3D%22190%22%20y%3D%2269%22%3EB%3C%2Ftspan%3E%3C%2Ftext%3E%3Cg%20fill%3D%22%23FFF%22%3E%3Ctext%20font-family%3D%22Roboto-Light%2C%20Roboto%22%20font-size%3D%2215.5%22%20font-weight%3D%22300%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%2219%22%20y%3D%2219%22%3E%3A%20move%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Light%2C%20Roboto%22%20font-size%3D%2215.5%22%20font-weight%3D%22300%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%2219%22%20y%3D%2275%22%3E%3A%20move.type_id%20%3D%20type.id%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Light%2C%20Roboto%22%20font-size%3D%2215.5%22%20font-weight%3D%22300%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%2219%22%20y%3D%2247%22%3E%3A%20type%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%220%22%20y%3D%2222%22%3EA%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%220%22%20y%3D%2278%22%3EC%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%220%22%20y%3D%2250%22%3EB%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E)\n\nThe first row of the 640 rows result:\n```\nid | name  | id | type_name   \n===+=======+====+==========\n1  | pound | 1  | normal\n```\nThe equivalent `RIGHT OUTER JOIN`:\n```SQL\nSELECT move.id, move.name,\n  type.id, type.name AS type_name\nFROM move\nRIGHT OUTER JOIN type ON\nmove.type_id = type.id;\n```\nYields the same first row (of 640 rows):\n```\nid | name  | id | type_name   \n===+=======+====+===========\n1  | pound | 1  | normal\n```\nConversely, the `RIGHT JOIN` representation is this:\n\n![rightjoin](%3Csvg%20width%3D%22100%25%22%20height%3D%22auto%22%20viewBox%3D%220%200%20276%20202%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ctitle%3EGroup%204%3C%2Ftitle%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20transform%3D%22translate%2843%201%29%22%20stroke-width%3D%222%22%20stroke%3D%22%23FFF%22%3E%3Ccircle%20cx%3D%2260.5%22%20cy%3D%2260.5%22%20r%3D%2260.5%22%2F%3E%3Ccircle%20cx%3D%22130.5%22%20cy%3D%2260.5%22%20r%3D%2260.5%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M138.5%2012.146C153.932%2023.109%20164%2041.129%20164%2061.5s-10.068%2038.39-25.5%2049.354C123.068%2099.891%20113%2081.871%20113%2061.5s10.068-38.39%2025.5-49.354z%22%20stroke%3D%22%23FFF%22%20stroke-width%3D%222%22%2F%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20fill%3D%22%23FFF%22%20transform%3D%22translate%280%201%29%22%3E%3Ctspan%20x%3D%2274%22%20y%3D%2269%22%3EA%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20fill%3D%22%23FFF%22%20transform%3D%22translate%280%201%29%22%3E%3Ctspan%20x%3D%22131%22%20y%3D%2269%22%3EC%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20fill%3D%22%23FFF%22%20transform%3D%22translate%280%201%29%22%3E%3Ctspan%20x%3D%22190%22%20y%3D%2269%22%3EB%3C%2Ftspan%3E%3C%2Ftext%3E%3Cg%20fill%3D%22%23FFF%22%3E%3Ctext%20font-family%3D%22Roboto-Light%2C%20Roboto%22%20font-size%3D%2215.5%22%20font-weight%3D%22300%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%2219%22%20y%3D%2219%22%3E%3A%20move%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Light%2C%20Roboto%22%20font-size%3D%2215.5%22%20font-weight%3D%22300%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%2219%22%20y%3D%2275%22%3E%3A%20move.type_id%20%3D%20type.id%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Light%2C%20Roboto%22%20font-size%3D%2215.5%22%20font-weight%3D%22300%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%2219%22%20y%3D%2247%22%3E%3A%20type%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%220%22%20y%3D%2222%22%3EA%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%220%22%20y%3D%2278%22%3EC%3C%2Ftspan%3E%3C%2Ftext%3E%3Ctext%20font-family%3D%22Roboto-Regular%2C%20Roboto%22%20font-size%3D%2224%22%20transform%3D%22translate%280%20123%29%22%3E%3Ctspan%20x%3D%220%22%20y%3D%2250%22%3EB%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E)\n\n\nThere shouldn\'t be any difference between the two outputs as every Pokémon, move, type or item is already in the game and `NULL` entries would probably break everything. However, if there was a move without a type in the DB (for the left join) or a type for which there are no moves (for the right join), the output would look like this:\n```\n# Left Join\nid  |        name       | id | type_name\n====+===================+====+===========\n1234| coolest-move-ever | NULL  | NULL\n\n# Right Join\nid    | name | id  | type_name   \n======+======+=====+============\nNULL  | NULL | 19  | wood\n```'
        ]));
    });

    test('parses the Practice Question question', () => {
        testInsights.forEach((insight) => {
            expect(insight).toHaveProperty('practiceQuestion')
        });
      
        let practiceQuestionArr = testInsights.map((insight) => {return insight.practiceQuestion.text});

        expect(practiceQuestionArr).toEqual(expect.arrayContaining([
            '`ping` will send ??? and count the time until the\n\n???.',
            'Add a `v1.0` annotated tag to the commit `ac32b10`.\n```\n$ git ??? ??? ??? ac32b10\n```',
            'What would the following snippet print?\n```\nfunction mult(x, y){\n  var z = x * x;\n}\n\nconsole.log(mult(2,3));\n???\n```',
            'What is the OSI 7 Layer Model?\n???'
        ]));
    });

    test('parses the Practice Question answers', () => {
        testInsights.forEach((insight) => {
            expect(insight).toHaveProperty('practiceQuestion')
        });
      
        let practiceQuestionArr = testInsights.map((insight) => {return insight.practiceQuestion.answers});

        expect(practiceQuestionArr).toEqual(expect.arrayContaining([        
            [ 'a flexible standard for various network configurations',
                'a hard standard for various network configurations',
                'a flexible standard for various hardware component configurations',
                'a hard standard for various hardware component configurations' ],
            [ 'the LOJ result contains all rows in the first table',
                'the LOJ result contains all rows in the second table',
                'only their name differ',
                'tables intersection can only be found as part of IJ result' ],
            [ '`FROM`',
                '`RIGHT OUTER JOIN`',
                '`ON`',
                '`AS`',
                '`pokemon`',
                '`OUTER JOIN`',
                '`SELECT`',
                '`ORDER BY`' ],
            [ 'the resource requested',
                'the new entity created',
                'the HTTP version',
                'the same initial headers' ],
            [ '`FROM`',
                '`UNION`',
                '`name`',
                '`region_name`',
                '`ON`',
                '`OUTER JOIN`',
                '`*`' ]
        ]))
    })

    test('parses the Revision Question question', () => {
        testInsights.forEach((insight) => {
            expect(insight).toHaveProperty('revisionQuestion')
        });
      
        let revisionQuestionArr = testInsights.map((insight) => {return insight.revisionQuestion.text});
        
        expect(revisionQuestionArr).toEqual(expect.arrayContaining([
            'What would the following snippet print?\n```\nfunction add(x, y){\n  var sum = x + y;\n}\n\nconsole.log(add(2,3));\n???\n```',
            'When can a component be written as a `function`?\n\nWhen it has ???.',
            'The syntax for declaring an IIFE function is:\n```\n(???{\n // code\n})???;\n```',
            'The OSI 7 Layer Model is ordered, from bottom to top, in the following order:\n\n1. ???\n2. ???\n3. ???\n4. ???\n5. ???\n6. ???\n7. ???',
            'Complete the following snippet such that the command is a valid `RIGHT JOIN`:\n```SQL\nSELECT *\n??? type\n??? type_efficacy ???\ntype.id = type_efficacy.target_type_id;\n```',
            'Is the following statement true or false?\n\nIn order to join multiple tables together, subqueries must be used.\n\n???',
            'What is the format of status codes indicating the **success** of a request?\n\n???',
            '??? command retrieves all rows, `even duplicated`, of the union.',
            'Complete the following command line snippet to download the picture:\n```\n$ ??? ??? ???\n         https://catpictures.com/cat1.jpg\n```',
            'Based on the distance, which server would respond to pings faster?\n\n???',
            'Complete the command to retrieve all tags that are part of `v2`:\n```\n$ git tag ??? ???\n```' 
        ]));
    });

    test('parses the Revision Question answers', () => {
        testInsights.forEach((insight) => {
            expect(insight).toHaveProperty('revisionQuestion')
        });
        
        let revisionQuestionArr = testInsights.map((insight) => {return insight.revisionQuestion.answers});
        
        expect(revisionQuestionArr).toEqual(expect.arrayContaining([
            [ '`undefined`', 
                '`5`', 
                '`false`', 
                '`error`' ],
            [ 'no `state` and **lifecycle methods**',
                'no `state`',
                'no **lifecycle methods**',
                'no `props`' ],
            [ '`function()`', 
                '`()`', 
                '`functionName()`', 
                '`{}`', 
                '`apply`' ],
            [ 'Physical Layer',
                'Data Link Layer',
                'Network Layer',
                'Transport Layer',
                'Session Layer',
                'Presentation Layer',
                'Application Layer' ],
            [ '`FROM`', 
                '`RIGHT JOIN`', 
                '`ON`', 
                '`LEFT JOIN`', 
                '`WHERE`' ],
            [ 'false', 
                'true' ],
            [ '`2xx`', 
                '`1xx`', 
                '`3xx`' ],
            [ '`UNION ALL`', 
                '`UNION`', 
                '`JOIN`', 
                '`SELECT`' ],
            [ '`curl`', 
                '`-o`', 
                '`cat.jpg`', 
                '`-O`', 
                '`-d`' ],
            [ 'a close one', 
                'a distant one', 
                'the distance isn’t relevant' ],
            [ '`-l`', 
                '`v2*`', 
                '`2`', 
                '`-m`' ]
        ]));
    });


    test('parses the Quiz headline', () => {
        testInsights.forEach((insight) => {
            expect(insight).toHaveProperty('quizQuestion')
        })

        let quizHeadlineArr = testInsights
            .filter(insight => insight.quizQuestion != null)
            .map((insight) => { return insight.quizQuestion.headline });

        expect(quizHeadlineArr).toEqual(expect.arrayContaining([
            'What is the OSI 7 Layer Model?',
            'LEFT OR RIGHT?',
            'Sometimes one is not enough?',
            'Can you use a UNION of SELECTs?'
        ])); 
    });

    test('parses the Quiz question', () => {
        testInsights.forEach((insight) => {
            expect(insight).toHaveProperty('quizQuestion')
        })

        let quizQuestionArr = testInsights
            .filter(insight => insight.quizQuestion != null)
            .map((insight) => { return insight.quizQuestion.question });
        expect(quizQuestionArr).toEqual(expect.arrayContaining([
            'What is the OSI 7 Layer Model?',
            'Given the tables called `location_area` and `location`:\n\nid  | game_index | location_id |       name                      \n-|-|-|-\n  1 |          1 |           1 | canalave-city-area\n  2 |          2 |           2 | eterna-city-area\n  3 |          3 |           3 | pastoria-city-area\n  4 |          4 |           4 | sunyshore-city-area\n(...)\n\nid  | region_id |     name           \n-|-|-\n  1 |         4 | canalave-city\n  2 |         4 | eterna-city\n  3 |         4 | pastoria-city\n(...)\n\n\nNote that there are 6 regions, but not all locations belong to one of them. Get game_index\'s region, `NULL` if there is none. The result should look like this:\n\nid  | game_index | region_id\n-|-|-\n  1 |          1 |         4\n  2 |          2 |         4\n  3 |          3 |         4\n  (...)\n  21|          21|          \n  44|          44|',
            'Given the tables called `pokedex`, `version_group` and `pokedex_version_group`:\n\nid | is_main_series | region_id | name       \n-|-|-|-\n 1 | t              |           | national\n 2 | t              |         1 | kanto\n 3 | t              |         2 | original-johto\n 4 | t              |         3 | hoenn\n\n(...)\n\nid | order | generation_id | name            \n-|-|-|-\n 1 |     1 |             1 | red-blue\n 2 |     2 |             1 | yellow\n 3 |     3 |             2 | gold-silver\n(...)\n\nid | pokedex_id | version_group_id\n-|-|-\n 1 |          2 |                1\n 2 |          2 |                2\n 3 |          2 |                7\n\nGet the names of pokedexes and version_groups using `pokedex_version_group` table. Do not include records that don\'t have both, pokedex and version_group :',
            'Given the tables called `item_pocket` and `item_category`:\n\nid |   name'
        ]));
        
    });

    test('parses the insight footnotes', () => {
        testInsights.forEach((insight) => {
            expect(insight).toHaveProperty('footnotes')
        })

        let footnotesArr = testInsights
            .filter(insight => insight.footnotes != null)
            .map(insight => {return insight.footnotes});
        
        expect(footnotesArr).toEqual(expect.arrayContaining([
            '[1:User Agents]\nApplications that are acting on behalf of the user. One category of user agents includes web browsers.\n\nA user agent sends information to the server about the web browser, operating system and device (whether the desktop or mobile version of the website should be fetched).'
        ]));
        
    })

    test('captures all fields defined in the yaml section', () => {
        testInsights.forEach((insight) => {
            expect(insight).toHaveProperty("rawText");
            expect(insight).toHaveProperty("title");
            expect(insight).toHaveProperty("author");
            expect(insight).toHaveProperty("levels");
            expect(insight).toHaveProperty("type");
            expect(insight).toHaveProperty("title");
            expect(insight).toHaveProperty("parent");
            expect(insight).toHaveProperty("links");
        });
    });

    test('renders content properly', () => {
        testInsights.forEach((insight)=> {
            // Render as AST and compare values
            let astInsight = ast.parse(insight.render());
            let astContent;
            while (astContent == undefined || astInsight.nodes.length > 0) {
                if (astInsight.nodes[0].name === "content") astContent = astInsight.nodes[0].value;
                astInsight.nodes.shift();
            }
            if (astContent == null) return;
            expect(astContent
                .replace(/\n\n*/g, "\n")
            ).toBe(insight.content
                .replace(/\n\n*/g, "\n")
            );
        })
    })

    test('renders practice question properly', () => {
        testInsights.forEach((insight)=> {
            // Render as AST and compare values
            let astInsight = ast.parse(insight.render());
            let astPracticeQuestion;
            while (astPracticeQuestion == undefined && astInsight.nodes.length > 0) {
                if (astInsight.nodes[0].name === "practiceQuestion"){
                    astPracticeQuestion = astInsight.nodes[0].value;
                } 
                astInsight.nodes.shift();
            }
            if (astPracticeQuestion == null) return;
            expect(astPracticeQuestion
                .replace(/\n\n*/g, "\n")
            ).toBe(insight.practiceQuestion.rawText
                .replace(/\n\n*/g, "\n")
            );
        })
    })

    test('renders revision question properly', () => {
        testInsights.forEach((insight)=> {
            // Render as AST and compare values
            let astInsight = ast.parse(insight.render());
            let astRevisionQuestion;
            while (astRevisionQuestion == undefined && astInsight.nodes.length > 0) {
                if (astInsight.nodes[0].name === "revisionQuestion"){
                    astRevisionQuestion = astInsight.nodes[0].value;
                } 
                astInsight.nodes.shift();
            }
            if (astRevisionQuestion == null) return;
            expect(astRevisionQuestion
                .replace(/\n\n*/g, "\n")
            ).toBe(insight.revisionQuestion.rawText
                .replace(/\n\n*/g, "\n")
            );
        })
    })

    // *** This is a can of worms. Open at your own risk ***
    // test('renders quiz question properly', () => {
    //     testInsights.forEach((insight)=> {
    //         // Render as AST and compare values
    //         let astInsight = ast.parse(insight.render());
    //         let astQuizQuestion;
    //         while (astQuizQuestion == undefined && astInsight.nodes.length > 0) {
    //             if (astInsight.nodes[0].name === "quiz"){
    //                 astQuizQuestion = astInsight.nodes[0].value;
    //                 console.log(astQuizQuestion)
    //             } 
    //             astInsight.nodes.shift();
    //         }
    //         if (astQuizQuestion == null) return;
    //         expect(astQuizQuestion
    //             .replace(/\n\n*/g, "\n")
    //             .replace(/\ \ */g, " ")
    //         ).toBe(insight.quizQuestion.rawText
    //             .replace(/\n\n*/g, "\n")
    //             .replace(/\ \ */g, " ")
    //         );
    //     })
    // })

    test('renders footnotes properly', () => {
        testInsights.forEach((insight)=> {
            // Render as AST and compare values
            let astInsight = ast.parse(insight.render());
            let astFootnotes;

            while (astFootnotes == undefined && astInsight.nodes.length > 0) {
                // console.log(astInsight.nodes[0].name)
                if (astInsight.nodes[0].name === "footnotes"){
                    console.log("AAAAAAAAAAAAAAAAAAAAAAAA")
                    astFootnotes = astInsight.nodes[0].value;
                } 
                astInsight.nodes.shift();
            }
            if (astFootnotes == null) return;
            expect(astFootnotes
                .replace(/\n\n*/g, "\n")
            ).toBe(insight.footnotes
                .replace(/\n\n*/g, "\n")
            );
        })
    })
});
