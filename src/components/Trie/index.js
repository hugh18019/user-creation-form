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

// Definitions of a Trie
export class Trie {
    root;
    constructor( TrieNode ) {
        this.root = TrieNode;
    }

    // Insert each character of the input str into the trie if it's not already there
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

    // Builds the trie from the dictionary
    buildTrie () {
        for ( let i = 0; i < dict.length; i++ ) {
            var each = dict[i].split(' ');
            for ( let word of each ) {
                map[word] = i;
                this.insert( word );
            }
        }
    }

    // Searches for the input str in the trie
    // Start at the root and goes one level down each iteration looking for one character of the input string
    // one character per iteration. 
    // If in every level the trie finds the next character in the input string, the input string is in the trie
    // If not then it's not in the trie;
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

    // Uses Breadth First Search to look for all next closest words of the input string
    autocomplete ( str ) {

        var results = Array();

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

            // Pushes onto the queue all possible next characters that the current path can absorb
            for ( let key in children ) {
                var root = children[ key ];
                var path = new_path + children[ key ].value;
                var new_obj = { root, path };
                queue.push( new_obj );
            }
        }

        // For each closest word found, finds the corresponding entry in the dictionary it belongs to
        // For example, if the word is "Head", then its corresponding entry in the dictionary is "Head of Shruberry"
        // Pushes all such entries onto the results array and returns the results array.
        for ( let word of words ) {
            if ( word ) {
                var str_in_dict = dict[ map[ word ] ].split(' ');

                if ( word == str_in_dict[0] ) {
                    console.log( 'dict[ map[ word ] ]', dict[ map[ word ] ] );
                    results.push( dict[ map[ word ] ] );
                }
            }
        }

        return results;

    }
}

// Definition of a TrieNode
export class TrieNode {
    value;
    children = Object();
    terminal = false;
    idx_in_dict

    constructor( char ) {
        this.value = char;
    }
}


