import type { App, Component, Directive, Plugin } from 'vue';

function withInstall<T>(
  comp: T,
  alias?: string,
  directive?: { name: string; comp: Directive<T & Plugin> },
): T & Plugin {
  const componentPlugin = comp as T & Component & Plugin;

  componentPlugin.install = (app: App, name?: string) => {
    app.component(alias || name || componentPlugin.name || '', comp as Component);
    directive && app.directive(directive.name, directive.comp);
  };

  return componentPlugin;
}

export default withInstall;
