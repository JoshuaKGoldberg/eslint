declare module "@eslint/eslintrc" {
    import type { ConfigArray, ExtractedConfig } from "@humanwhocodes/config-array";
    import type { Linter } from "eslint";

    interface FlatCompatOptions {
        /**
         * default: process.cwd()
         */
        baseDirectory?: string;
        resolvePluginsRelativeTo?: string;
        recommendedConfig?: Linter.Config;
        allConfig?: Linter.Config;
    }

    /**
     * A compatibility class for working with configs.
     */
    class FlatCompat {
        constructor(options?: FlatCompatOptions);

        /**
         * Translates an ESLintRC-style config into a flag-config-style config.
         * @param eslintrcConfig The ESLintRC-style config object.
         * @returns A flag-config-style config object.
         */
        config(eslintrcConfig: Linter.Config): Linter.FlatConfig[];

        /**
         * Translates the `env` section of an ESLintRC-style config.
         * @param envConfig The `env` section of an ESLintRC config.
         * @returns An array of flag-config objects representing the environments.
         */
        env(envConfig: { [name: string]: boolean }): Linter.FlatConfig[];

        /**
         * Translates the `extends` section of an ESLintRC-style config.
         * @param configsToExtend The names of the configs to load.
         * @returns An array of flag-config objects representing the config.
         */
        extends(...configsToExtend: string[]): Linter.FlatConfig[];

        /**
         * Translates the `plugins` section of an ESLintRC-style config.
         * @param plugins The names of the plugins to load.
         * @returns An array of flag-config objects representing the plugins.
         */
        plugins(...plugins: string[]): Linter.FlatConfig[];
    }

    interface ConfigData {
        env?: Record<string, boolean>;
        extends?: string | string[];
        globals?: Record<string, GlobalConf>;
        ignorePatterns?: string | string[];
        noInlineConfig?: boolean;
        overrides?: OverrideConfigData[];
        parser?: string;
        parserOptions?: ParserOptions;
        plugins?: string[];
        processor?: string;
        reportUnusedDisableDirectives?: boolean;
        root?: boolean;
        rules?: Record<string, Linter.RuleEntry>;
        settings?: Object;
    }

    namespace Legacy {
        namespace ConfigOps {
            export function getRuleSeverity(ruleConfig): Linter.RuleLevel;
            export function normalizeConfigGlobal(globals): Record<string, "readonly" | "writable" | "off">;
        }

        interface ConfigValidatorOptions {
            builtInRules: typeof Rules;
        }

        class ConfigValidator {
            constructor(options: ConfigValidatorOptions);
        }

        const environments: unknown;

        interface CascadingConfigArrayFactoryOptions {
            additionalPluginPool?: unknown;
            baseConfig?: unknown;
            builtInRules?: unknown;
            cliConfig?: unknown;
            cwd?: string;
            getEslintAllConfig?: () => ConfigData;
            getEslintRecommendedConfig?: () => ConfigData;
            ignorePath?: string;
            loadRules?: unknown;
            resolvePluginsRelativeTo?: unknown;
            rulePaths?: unknown;
            specificConfigPath?: string;
            useEslintrc?: boolean;
        }

        interface GetConfigArrayForFileOptions {
            ignoreNotFoundError?: boolean;
        }

        class CascadingConfigArrayFactory {
            constructor(options: CascadingConfigArrayFactoryOptions);
            getConfigArrayForFile(filePath?: string, options?: GetConfigArrayForFileOptions): ConfigArray;
        }

        namespace IgnorePattern {
            function createDefaultIgnore(cwd: string): (filePath: string) => boolean;
        }

        const getUsedExtractedConfigs: (value: ConfigArray) => ExtractedConfig[];

        namespace ModuleResolver {
            function resolve(format: string, path: string): string;
        }

        namespace naming {
            function getNamespaceFromTerm(name: string): string;
            function normalizePackageName(name: string, formatter: string): string;
        }
    }
}

declare module "@eslint/eslintrc/universal" {
    export * from "@eslint/eslintrc";
}
