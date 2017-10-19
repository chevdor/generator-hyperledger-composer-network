'use strict';

var util = require('util');
var path = require('path');
var Generator = require('yeoman-generator');
var yosay = require('yosay');
var os = require('os');

module.exports = class extends Generator {
    initializing() {
        this.pkg = require('../package.json');
    }

    prompting() {
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to this Hyperledger Composer Network Generator!'
        ));

        return this.prompt([{
            type: 'input',
            message: 'Let´s start with your name?',
            name: 'Author',
            store: true
        }, {
            type: 'input',
            message: 'What about your email?',
            name: 'Email',
            store: true
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
            default: 'Apache License Version 2.0'
        }]).then((props) => {
            // this.log('app name', answers.name);
            // this.log('cool feature', answers.cool);
            this.Author = props.Author;
            this.Email = props.Email;
            this.NetworkNamespace = props.NetworkNamespace;
            this.NetworkName = props.NetworkName;
            this.NetworkId = props.NetworkId;
            this.Description = props.Description;
            this.NetworkVersion = props.NetworkVersion;
            this.License = props.License;
        });
    }

    writing() {
        this.fs.copy(this.templatePath('.nvmrc'), '.nvmrc');
        this.fs.copy(this.templatePath('config'), 'config');
        this.fs.copy(this.templatePath('doc'), 'doc');
        this.fs.copy(this.templatePath('features'), 'features');

        this.fs.copyTpl(
            this.templatePath('lib/sample.js'),
            this.destinationPath('lib/sample.js'), this
        );

        this.fs.copyTpl(
            this.templatePath('models/sample.cto'),
            this.destinationPath('models/sample.cto'), this
        );
        this.fs.copyTpl(
            this.templatePath('test/sample.js'),
            this.destinationPath('test/sample.js'), this
        );

        this.fs.copy(this.templatePath('header.txt'), 'header.txt');
        this.fs.copy(this.templatePath('index.js'), 'index.js');
        this.fs.copy(this.templatePath('networkimage.svg'), 'networkimage.svg');
        this.fs.copy(this.templatePath('networkimageanimated.svg'), 'networkimageanimated.svg');

        this.fs.copyTpl(
            this.templatePath('jsdoc.json'),
            this.destinationPath('jsdoc.json'), this
        );
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'), this
        );
        this.fs.copyTpl(
            this.templatePath('permissions.acl'),
            this.destinationPath('permissions.acl'), this
        );
        this.fs.copyTpl(
            this.templatePath('README.adoc'),
            this.destinationPath('README.adoc'), this
        );
    }
}