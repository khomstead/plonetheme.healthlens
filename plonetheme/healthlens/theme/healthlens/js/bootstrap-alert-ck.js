/* ==========================================================
 * bootstrap-alert.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */!function(a){"use strict";var b='[data-dismiss="alert"]',c=function(c){a(c).on("click",b,this.close)};c.prototype={constructor:c,close:function(b){function f(){e.trigger("closed").remove()}var c=a(this),d=c.attr("data-target"),e;if(!d){d=c.attr("href");d=d&&d.replace(/.*(?=#[^\s]*$)/,"")}e=a(d);e.trigger("close");b&&b.preventDefault();e.length||(e=c.hasClass("alert")?c:c.parent());e.trigger("close").removeClass("in");a.support.transition&&e.hasClass("fade")?e.on(a.support.transition.end,f):f()}};a.fn.alert=function(b){return this.each(function(){var d=a(this),e=d.data("alert");e||d.data("alert",e=new c(this));typeof b=="string"&&e[b].call(d)})};a.fn.alert.Constructor=c;a(function(){a("body").on("click.alert.data-api",b,c.prototype.close)})}(window.jQuery_1_7_1);