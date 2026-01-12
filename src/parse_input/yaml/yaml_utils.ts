import { ExecutableFromYAML } from "./yaml_types";

export function only_component_names(exec_string: ExecutableFromYAML) {
    return exec_string.filter(word => word.toUpperCase() === word)
}