
var Slug = require('slug');

exports.seed = function(knex, Promise) {

    var counties = ["Dublin","Antrim","Down","Cork","Fingal","Galway","Londonderry","Kildare","DunLaoghaire","Limerick","Meath","Tyrone","Armagh","Donegal","Tipperary","Kerry","Wexford","Wicklow","Mayo","Louth","Clare","Waterford","Kilkenny","Westmeath","Laois","Offaly","Cavan","Sligo","Roscommon","Fermanagh","Monaghan","Carlow","Longford","Leitrim"];

    var arr = [knex('locations').del()];

    counties.forEach((county) => {
        arr.push( knex('locations').insert({ title: county, slug: Slug(county, { lower: true }), created_at: new Date(), updated_at: new Date() }) );
    });

    return new Promise.all(arr)

};
