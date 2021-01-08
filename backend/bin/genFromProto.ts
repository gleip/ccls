import * as path from 'path';
import * as shell from 'shelljs';
import * as rimraf from 'rimraf';

process.env.PATH += path.delimiter + path.join(process.cwd(), '../../node_modules', '.bin');

const PATH_TO_MODULE = process.argv[2];

if (!PATH_TO_MODULE) {
  throw new Error('Module path not specified');
}

const PROTO_DIR = path.join(__dirname, '../', PATH_TO_MODULE, 'protos');
const OUT_DIR = path.join(__dirname, '../', PATH_TO_MODULE, 'grpc');
const PROTOC_GEN_TS_PATH = path.join(__dirname, '../node_modules/.bin/protoc-gen-ts');

rimraf.sync(`${OUT_DIR}/*`);

const protoConfig = [
  `--plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" `,
  `--grpc_out="grpc_js:${OUT_DIR}" `,
  `--js_out="import_style=commonjs,binary:${OUT_DIR}" `,
  `--ts_out="grpc_js:${OUT_DIR}" `,
  `--proto_path ${PROTO_DIR} ${PROTO_DIR}/*.proto`,
];

shell.exec(`grpc_tools_node_protoc ${protoConfig.join(' ')}`);
