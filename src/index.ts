
import { runRelease } from "./release";
import { Command } from "commander";

const program = new Command();

program
  .name("paved-road")
  .description("Internal developer platform CLI")
  .version("0.1.0");

program
  .command("release")
  .description("Run release gates for one service")
  .requiredOption("--service <name>", "Service name") // forces a value
  .option("--dry-run", "Do not actually release")     // optional flag
  .action(async (opts) => {
  await runRelease({
    service: opts.service,
    dryRun: Boolean(opts.dryRun),
  });
});


program.parse(process.argv);



