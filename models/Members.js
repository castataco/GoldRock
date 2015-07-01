var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Members Model
 * ==========
 */

var Members = new keystone.List('Members');

Members.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
Members.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */

Members.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

Members.defaultColumns = 'name, email, isAdmin';
Members.register();
