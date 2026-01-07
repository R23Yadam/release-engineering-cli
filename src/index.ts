
import { runRelease } from "./release";
import { Command } from "commander";

const program = new Command();

program
  .name("paved-road")
  .description("Internal developer platform CLI")
  .version("0.1.0");

program
  .command("release")
  .option("--service <name>", "Service name")
  .option("--all", "Release all services")
  .option("--dry-run")
  .action(async (opts) => {
    const hasService = Boolean(opts.service);
    const hasAll = Boolean(opts.all);

    if (hasService === hasAll) {
      console.error("Specify exactly one of --service or --all");
      process.exit(2);
    }

    await runRelease({
      service: opts.service,
      all: Boolean(opts.all),
      dryRun: Boolean(opts.dryRun),
    });
  });


program.parse(process.argv);



