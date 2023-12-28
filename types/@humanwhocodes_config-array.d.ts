declare module "@humanwhocodes/config-array" {
    import * as eslint from "eslint";

    interface ObjectPropertySchema {
        merge: string | Function;
        validate: string | Function;
    }

    type ObjectPropertySchemaObjects = Record<string, ObjectPropertySchema | ObjectPropertySchemaObjects>;

    interface ExtractedConfig {
        ignores: (filePath: string, dot?: boolean) => boolean;
        rules: Record<string, eslint.Rule.RuleModule>;
        toCompatibleObjectAsConfigFileContent(): eslint.ESLint.ConfigData;
    }

    interface ConfigArrayOptions<Config extends eslint.Linter.Config | eslint.Linter.FlatConfig> {
        baseConfig?: Partial<Config[]>;
        basePath?: string;
        schema?: Record<string, ObjectPropertySchemaObjects>;
    }

    class ConfigArray<Config extends eslint.Linter.Config | eslint.Linter.FlatConfig> {
        constructor(configs: Config, options: ConfigArrayOptions);

        readonly pluginRules: ReadonlyMap<string, eslint.Rule.RuleModule>;

        extractConfig(filePath: string): ExtractedConfig;
        getConfig(filePath: string): Config
        isAdditionalTargetPath(filePath: string): boolean;
        isDirectoryIgnored(path: string): boolean;
        normalize(): Promise<void>;
        normalizeSync(): void;
        push(...configs: Config): void;
        unshift(...configs: Config): void;
    }

    class ConfigArraySymbol {
        static finalizeConfig: symbol;
        static preprocessConfig: symbol;
    }
}
