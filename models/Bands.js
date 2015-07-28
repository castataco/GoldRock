var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Bands = new keystone.List('Bands', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Bands.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'Members', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 }
	}
});

Bands.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Bands.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Bands.register();
