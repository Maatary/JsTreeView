/**
 * Created by maatary on 5/3/15.
 */


function setPoolPartyTreeBroswer($input, field){


    switch(field) {
        case "dc_contributor_author":

            var scheme = "http://thesaurus.iadb.org/publicthesauri/IdBAuthors";
            break;

        case "dc_subject":

            var scheme = "http://thesaurus.iadb.org/publicthesauri/IdBTopics";
            break;

        case "iadb_department":

            var scheme = "http://thesaurus.iadb.org/publicthesauri/IdBDepartments";
            break;

        case "dc_contributor_institution":

            var scheme = "http://thesaurus.iadb.org/publicthesauri/IdBInstitutions";
            break;

        case "dc_identifier_jel":

            var scheme = "http://thesaurus.iadb.org/publicthesauri/IdBJelCodes";
            break;

        default :

            var scheme = "http://thesaurus.iadb.org/publicthesauri/IdBCountries";

    }
    // Create the tree inside the <div id="tree"> element.
    $input.fancytree({
            source: doPoolPartyGetChildrenAjaxRequest(scheme),

            icons:false,

            selectMode: 1,

            focusOnSelect: false,



            lazyLoad: function(event, data){

                var node = data.node;
                // Load child nodes via ajax GET /getTreeData?mode=children&parent=1234

                data.result = doPoolPartyGetChildrenAjaxRequest(data.node.data.uri);
            },

            beforeActivate: function(event, data) {
                alert(data.node.data.uri)
                return false;
            },

            activate: function(event, data) {
                return false;
            },

            click: function(event, data) {
                data.node.toggleSelected()
            },

            beforeSelect: function(event, data) {
                return false;
            }

            /*focus: function(event, data) {
                console.log("in focus")
                return false
            },

            focusTree: function(event, data) {
                console.log("in focusTree")
                $(this).removeClass("fancytree-treefocus")
                return false
            }*/





            /*select: function(event, data){
                // A node is about to be selected: prevent this for folders:
                alert(data.node.data.uri)
            },

            beforeSelect: function(event, data){
                // A node is about to be selected: prevent this for folders:
                alert(data.node.data.uri)
            }*/
        }
    )
};



function doPoolPartyGetChildrenAjaxRequest(parent) {

    return $.ajax({

        url: "http://thesaurus.iadb.org/PoolParty/api/thesaurus/1DCE1204-1A66-0001-C169-8D70A28F1B09/childconcepts",

        data: {language: "en", parent: parent, properties: "skos:narrower"},

        username: 'superadmin',
        password: 'poolparty',

        dataType: 'json',
        crossDomain: true,


        beforeSend: function (req) {
            req.setRequestHeader('Authorization', 'Basic ' + btoa('superadmin:poolparty'));
        },

        xhrFields: {
            withCredentials: true
        },

        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
        },

        success: function (data) {

            for (var i = 0; i < data.length; i++) {
                data[i].title = data[i].prefLabel

                if (!(data[i].narrowers === undefined)) {
                    data[i].lazy = true
                }
            }

            data.sort(function(a, b) {

                if (a.prefLabel.toLowerCase() == b.prefLabel.toLowerCase())
                    return 0;
                if (a.prefLabel.toLowerCase() > b.prefLabel.toLowerCase())
                    return 1;
                else
                    return -1

            });

        }
    })
}