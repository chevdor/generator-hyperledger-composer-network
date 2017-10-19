'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var os = require('os');

function logDirectoryCopy(body, src, dest, options) {
    console.log(' + ' + src);
}

var HLComposerNetworkGenerator = yeoman.generators.Base.extend({
    initializing: function() {
        this.pkg = require('../package.json');
    },

    prompting: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to this Hyperledger Composer Network Generator!'
        ));

        var prompts = [{
            type: 'input',
            message: 'Let´s start with your name?',
            name: 'Author',
        }, {
            type: 'input',
            message: 'What about your email?',
            name: 'Email',
        }, {
            type: 'input',
            name: 'NetworkNamespace',
            message: 'A namespace will help?',
            default: 'org.acme.sample'
        }, {
            type: 'input',
            name: 'NetworkName',
            message: 'How are we going to call this Network?',
            default: 'My Network'
        }, {
            type: 'input',
            name: 'NetworkId',
            message: 'We will also need an Id?',
            default: this.appname
        }, {
            type: 'input',
            name: 'Description',
            message: 'How about a description, let´s get it done...',
        }, {
            type: 'input',
            name: 'NetworkVersion',
            message: 'What version do we start with?',
            default: '0.1.0'
        }, {
            type: 'input',
            name: 'License',
            message: 'What license would you like?',
            default: 'Apache License, Version 2.0'
        }];

        this.prompt(prompts, function(props) {
            this.Author = props.Author;
            this.Email = props.Email;
            this.NetworkNamespace = props.NetworkNamespace;
            this.NetworkName = props.NetworkName;
            this.NetworkId = props.NetworkId;
            this.Description = props.Description;
            this.NetworkVersion = props.NetworkVersion;
            this.License = props.License;
            done();
        }.bind(this));
    },

    writing: {
        app: function() {
            this.directory('config', 'doc', 'features', logDirectoryCopy)

            this.template('lib/sample.js');
            this.template('model/model.cto');
            this.template('test/sample.js');

            this.copy(['header.txt',
                'index.js', '*.svg',

            ]);

            this.template(['jdoc.json',
                'package.json',
                'permissions.acl',
                'README.adoc'
            ]);
        },
    },

    end: function() {
        // nothing to do here yet
    }
});

module.exports = HLComposerNetworkGenerator;