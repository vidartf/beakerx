/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import * as $ from "jquery";
import { Widget } from "@phosphor/widgets";
import { MessageLoop } from "@phosphor/messaging";

import UIOptionsWidgetInterface from "./UIOptionsWidgetInterface";
import IUIOptions from "../../Types/IUIOptions";
import {Messages} from "../../Messages";

export class UIOptionsWidget extends Widget implements UIOptionsWidgetInterface {

  public readonly AUTO_CLOSE_SELECTOR = '#auto_close';
  public readonly WIDE_CELLS_SELECTOR = '#wide_cells';
  public readonly IMPROVE_FONTS_SELECTOR = '#improve_fonts';
  public readonly SHOW_PUBLICATION_SELECTOR = '#show_publication';

  public readonly HTML_ELEMENT_TEMPLATE = `
<style>
  #ui_options {
    margin: 0 16px;
  }
</style>
<fieldset id="ui_options">
  <legend>UI Options:</legend>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" id="auto_close" name="auto_close" type="checkbox">
      <label class="form-check-label" for="auto_close">Auto close brackets</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" id="wide_cells" name="wide_cells" type="checkbox">
      <label class="form-check-label" for="wide_cells">Wide code cells</label>
    </div>
    <!--<div class="form-check">-->
      <!--<input class="form-check-input" id="improve_fonts" name="improve_fonts" type="checkbox">-->
      <!--<label class="form-check-label" for="improve_fonts">Improve fonts</label>-->
    <!--</div>-->
    <div class="form-check">
      <input class="form-check-input" id="show_publication" name="show_publication" type="checkbox">
      <label class="form-check-label" for="show_publication">Show publication</label>
    </div>
  </div>
</fieldset>
`;

  public get $node(): JQuery<HTMLElement> {
    return $(this.node);
  }

  constructor() {
    super();

    $(this.HTML_ELEMENT_TEMPLATE).appendTo(this.node);

    this.$node
      .find(`${ this.AUTO_CLOSE_SELECTOR },${ this.IMPROVE_FONTS_SELECTOR },${ this.WIDE_CELLS_SELECTOR },${ this.SHOW_PUBLICATION_SELECTOR }`)
      .on('change', this.optionsChangedHandler.bind(this));
  }

  public onLoad(options: IUIOptions) {
    this._options = options;

    this.setWideCells(options.wide_cells);
    this.setAutoClose(options.auto_close);
    // this.setImproveFonts(options.improve_fonts);
    this.setShowPublication(options.show_publication);
  }

  private optionsChangedHandler(evt): void {
    this._options[evt.currentTarget.id] = evt.currentTarget.checked;

    MessageLoop.sendMessage(
      this.parent,
      new Messages.UIOptionsChangedMessage(this._options)
    );
  }

  private setWideCells(checked: boolean) {
    this.$node
      .find(this.WIDE_CELLS_SELECTOR)
      .prop('checked', checked);
  }

  private setAutoClose(checked: boolean) {
    this.$node
      .find(this.AUTO_CLOSE_SELECTOR)
      .prop('checked', checked);
  }

  // private setImproveFonts(checked: boolean) {
  //   this.$node
  //     .find(this.IMPROVE_FONTS_SELECTOR)
  //     .prop('checked', checked);
  // }

  private setShowPublication(checked: boolean) {
    this.$node
      .find(this.SHOW_PUBLICATION_SELECTOR)
      .prop('checked', checked);

  }

  private _options: IUIOptions;
}
