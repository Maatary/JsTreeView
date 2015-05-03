/**
 * Created by maatary on 5/3/15.
 */


function setPoolPartyTreeBroswer($input){

    // Create the tree inside the <div id="tree"> element.
    $input.fancytree({
            source: doPoolPartyGetChildrenAjaxRequest("http://thesaurus.iadb.org/publicthesauri/IdBDepartments"),

            icons:false,

            lazyLoad: function(event, data){

                var node = data.node;
                // Load child nodes via ajax GET /getTreeData?mode=children&parent=1234

                data.result = doPoolPartyGetChildrenAjaxRequest(data.node.data.uri);
            }
        }
    )
};



function doPoolPartyGetChildrenAjaxRequest(parent) {

    return $.ajax({

        url: "http://thesaurus.iadb.org/PoolParty/api/thesaurus/1DCE031A-B429-0001-49B6-15A028B01F5D/childconcepts",

        data: {language: "en", parent: parent},

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
                data[i].lazy = true
            }

        }
    })
}