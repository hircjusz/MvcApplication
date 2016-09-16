using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication.Extensions
{
    public static class ActionExtensions
    {

        public static bool ActionAuthorized(this HtmlHelper htmlHelper, string action, string controller)
        {
            ControllerBase controllerBase = htmlHelper.ViewContext.Controller;
            var controllerContext = new ControllerContext(htmlHelper.ViewContext.RequestContext, controllerBase);

            var controllerDescriptor = new ReflectedControllerDescriptor(controllerContext.Controller.GetType());
            var actionDescriptor = controllerDescriptor.FindAction(controllerContext, action);

            if (actionDescriptor == null)
            {
                return false;
            }

            //FilterInfo filters= new FilterInfo(FilterProviders);

            return true;

        }

    }
}