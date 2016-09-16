using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MvcApplication.Extensions
{
    public static class LinkExtensions
    {

        public static MvcHtmlString ActionLinkAuthorized(this HtmlHelper htmlHelper, string linkText, string actionName,
            string controllerName, RouteValueDictionary routeValues=null, IDictionary<string, object> htmlAttributes=null, bool showActionLinkAsDisabled=false)
        {

            if (htmlHelper.ActionAuthorized(actionName, controllerName))
            {
                return MvcHtmlString.Create("Action Authorized");
            }

            return MvcHtmlString.Create("Hello Darek");
        }

    }
}