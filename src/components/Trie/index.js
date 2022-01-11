const dict = [ 
    "Head of Shrubbery",
    "Interim Substitute Teacher",
    "Water Softener",
    "Listener of the House",
    "Really Good Dancer",
    "Gainfully Unemployed",
    "Alexa Impersonator",
    "Chard Farmer",
    "Chief Frolicker (Jolly)",
    "Entry-level Seat Recliner",
    "CEO (Summer Internship)",
    "Widget Fabricator",
    "Underwater Basket Weaver"
]

var map = {
    "Head of Shrubbery": 0,
    "Interim Substitute Teacher": 1,
    "Water Softener": 2,
    "Listener of the House": 3,
    "Really Good Dancer": 4,
    "Gainfully Unemployed": 5,
    "Alexa Impersonator": 6,
    "Chard Farmer": 7,
    "Chief Frolicker (Jolly)": 8,
    "Entry-level Seat Recliner": 9,
    "CEO (Summer Internship)": 10,
    "Widget Fabricator": 11,
    "Underwater Basket Weaver": 12,
};

export class Trie {
    root;
    constructor( TrieNode ) {
        this.root = TrieNode;
    }

    insert( str ) {
        if ( !this.root )
            this.root = new TrieNode ();

        var cur = this.root;
        var len = str.length;

        for ( let i = 0 ; i < len; i++ ) {

            if ( !cur.children[ str[i] ] ) {
                var node = new TrieNode( str[i] );    
                cur.children[ str[i] ] = node;
            }

            cur = cur.children[ str[i] ];

        }

        if (cur.terminal)
            return false;
        else {
            cur.terminal = true;
            return true;
        }
    }

    buildTrie () {
        for ( let i = 0; i < dict.length; i++ ) {
            var each = dict[i].split(' ');
            for ( let word of each ) {
                map[word] = i;
                this.insert( word );
            }
        }
    }

    search ( str ) {
        var cur = this.root;
        var len = str.length;
        var message = String();

        for ( let i = 0; i < len; i++ ) {
            if ( cur.children[ str[i] ] ) {
                cur = cur.children[ str[i] ];
            }
            else {
                message = "not found";
                return { cur, message };
            }
        }

        message = "found";
        return { cur, message };
    }

    autocomplete ( str ) {

        if ( dict[ map[ str ] ] == str ) {
            console.log(str);
            return str;
        }
            

        var { cur: root } = this.search( str );

        if ( !root.value ) {
            return null;
        }

        var queue = Array();
        var path = String();
        var words = Array();

        path = str;

        queue.push( { root, path } );

        while ( queue.length > 0 ) {
            var { root, path : new_path } = queue.shift();

            if ( root.terminal )
                words.push( new_path );

            var children = root.children;

            for ( let key in children ) {
                var root = children[ key ];
                var path = new_path + children[ key ].value;
                var new_obj = { root, path };
                queue.push( new_obj );
            }
        }

        // console.log( "words", words );
        // console.log( "map", map );
        // console.log( "dict", dict );

        for ( let word of words ) {
            if ( word ) {
                console.log( "word", word );
                console.log( "map[word]", map[word] );

                var str_in_dict = dict[ map[ word ] ].split(' ');

                console.log( 'str_in_dict', str_in_dict )
                if ( word == str_in_dict[0] )
                    console.log( 'dict[ map[ word ] ]',dict[ map[ word ] ] );
            }
        }

        return words;

    }
}

export class TrieNode {
    value;
    children = Object();
    terminal = false;
    idx_in_dict

    constructor( char ) {
        this.value = char;
    }
}


