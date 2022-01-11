import dict from "./dictionary";

var map = Object();

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


