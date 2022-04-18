const { exec } = require("child_process");
const util = require("util");
const execAsync = util.promisify(exec);

async function commit(beforeDate) {
	const current = new Date().getTime();
	const date = new Date(current-beforeDate*24*60*60*1000);
  console.log(date);
  await execAsync(`git add .`);
	await execAsync(`git commit --quiet --date "${date}" -m "Update"`);
}

commit(process.argv[3]);