#!/usr/bin/env node

/* eslint no-console:0 */

/**
 * External dependencies/
 */
const fs = require( 'fs' ),
	globby = require( 'globby' ),
	program = require( 'commander' );

/**
 * Internal dependencies/
 */
const i18nCalypso = require( '../cli' );

function collect( val, memo ) {
	memo.push( val );
	return memo;
}

function list( val ) {
	return val.split( ',' );
}

program
	.version( '0.0.1' )
	.option( '-k, --keywords <keyword,keyword>', 'keywords of the translate function', list )
	.option( '-f, --format <format>', 'format of the output (php or pot)' )
	.option( '-o, --output-file <file>', 'output file for WP-style translation functions' )
	.option( '-i, --input-file <filename>', 'files in which to search for translation methods', collect, [] )
	.option( '-p, --project-name <name>', 'name of the project' )
	.option( '-e, --extra <name>', 'Extra type of strings to add to the generated file (for now only `date` is available)' )
	.option( '-a, --array-name <name>', 'name of variable in generated php file that contains array of method calls' )
	.usage( '-o outputFile -i inputFile -f format [inputFile ...]' )
	.on( '--help', function() {
		console.log( '  Examples' );
		console.log( '\n    $ i18n-calypso -o ./outputFile.pot -i ./inputFile.js -i ./inputFile2.js' );
		console.log( '' );
	} )
	.parse( process.argv );

const keywords = program.keywords;
const format = program.format;
const outputFile = program.outputFile;
const arrayName = program.arrayName;
const projectName = program.projectName;
const inputFiles = ( program.inputFile.length ) ? program.inputFile : program.args;

if ( inputFiles.length === 0 ) {
	throw new Error( 'Error: You must enter the input file. Run `i18n-calypso -h` for examples.' );
}

const inputPaths = globby.sync( inputFiles );

console.log( 'Reading inputFiles:\n\t- ' + inputPaths.join( '\n\t- ' ) );

inputPaths.forEach( function( inputFile ) {
	if ( ! fs.existsSync( inputFile ) ) {
		console.error( 'Error: inputFile, `' + inputFile + '`, does not exist' );
	}
} );

let extras = null;
if ( program.extra ) {
	extras = program.extra;
	if ( ! Array.isArray( program.extra ) ) {
		extras = [ extras ];
	}
}

const result = i18nCalypso( {
	keywords: keywords,
	output: outputFile,
	phpArrayName: arrayName,
	inputPaths: inputPaths,
	format: format,
	extras: extras,
	projectName: projectName,
} );

if ( outputFile ) {
	console.log( 'Done.' );
} else {
	console.log( result );
}
