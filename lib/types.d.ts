import { ScopeManager } from "eslint-scope";
import { VisitorKeys } from "eslint-visitor-keys";
import * as eslint from "eslint";
import * as estree from "estree";

export type GlobalConf = boolean | "off" | "readable" | "readonly" | "writable" | "writeable";
export type SeverityConf = 0 | 1 | 2 | "off" | "warn" | "error";

export interface EcmaFeatures {
    globalReturn?: boolean;
    jsx?: boolean;
    impliedStrict?: boolean;
}

export interface ParserOptions {
    ecmaFeatures?: EcmaFeatures;
    ecmaVersion?: 3 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024;
    sourceType?: "script" | "module";
    allowReserved?: boolean;
}

export interface LanguageOptions {
    ecmaVersion?: number | "latest";
    globals?: Record<string, GlobalConf>;
    sourceType?: "script" | "module" | "commonjs";
    parser?: string | Object;
    parserOptions?: Object;
}

export interface OverrideConfigData {
    env?: Record<string, boolean>;
    excludedFiles?: string | string[];
    extends?: string | string[];
    files: string | string[];
    globals?: Record<string, GlobalConf>;
    noInlineConfig?: boolean;
    overrides?: OverrideConfigData[];
    parser?: string;
    parserOptions?: ParserOptions;
    plugins?: string[];
    processor?: string;
    reportUnusedDisableDirectives?: boolean;
    rules?: Record<string, eslint.Linter.RuleLevel>;
    settings?: Object;
}

export interface ParseResult {
    ast: Object;
    scopeManager?: ScopeManager;
    services?: Record<string, any>;
    visitorKeys?: VisitorKeys;
}

export interface Parser {
    parse: (text: string, options: ParserOptions) => Object;
    parseForESLint?: (text: string, options: ParserOptions) => ParseResult;
}

export interface Environment {
    globals?: Record<string, GlobalConf>;
    parserOptions?: ParserOptions;
}

export interface LintMessage {
    column: number | undefined;
    endColumn?: number;
    endLine?: number;
    fatal?: boolean;
    fix?: { range: [number, number]; text: string; };
    line: number | undefined;
    message: string;
    messageId?: string;
    nodeType: (string | null);
    ruleId: string | null;
    severity: 0 | 1 | 2;
    suggestions?: Array<{ desc?: string; messageId?: string; fix: { range: [number, number]; text: string; }; }>;
}

export interface SuppressedLintMessage {
    column: number | undefined;
    endColumn?: number;
    endLine?: number;
    fatal?: boolean;
    fix?: { range: [number, number]; text: string; };
    line: number | undefined;
    message: string;
    messageId?: string;
    nodeType: (string | null);
    ruleId: string | null;
    severity: 0 | 1 | 2;
    suppressions: Array<{ kind: string; justification: string; }>;
    suggestions?: Array<{ desc?: string; messageId?: string; fix: { range: [number, number]; text: string; }; }>;
}

export interface SuggestionResult {
    desc: string;
    messageId?: string;
    fix: { text: string; range: number[]; };
}

export interface Processor {
    preprocess?: (text: string, filename: string) => Array<string | { text: string; filename: string; }>;
    postprocess?: (messagesList: LintMessage[][], filename: string) => LintMessage[];
    supportsAutofix?: boolean;
}

export interface RuleMetaDocs {
    description: string;
    recommended: boolean;
    url: string;
}

/**
 * A linting result.
 */
export interface LintResult {
    filePath: string;
    messages: LintMessage[];
    suppressedMessages: SuppressedLintMessage[];
    errorCount: number;
    fatalErrorCount: number;
    warningCount: number;
    fixableErrorCount: number;
    fixableWarningCount: number;
    source?: string;
    output?: string;
    usedDeprecatedRules: DeprecatedRuleInfo[];
}

