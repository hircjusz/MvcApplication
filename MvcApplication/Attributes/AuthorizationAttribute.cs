using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace MvcApplication.Attributes
{

    public class AuthorizationAttribute : ActionFilterAttribute
    {
        private String[] roles = null;
        public AuthorizationAttribute(params string[] roles)
        {
            this.roles = roles;
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string actionName = filterContext.ActionDescriptor.ActionName;
            string controllerName = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;

            if (!CheckAccessRight(actionName, controllerName))
            {
                string redirectUrl = string.Format("?returnUrl={0}", filterContext.HttpContext.Request.Url.PathAndQuery);

                filterContext.HttpContext.Response.Redirect(FormsAuthentication.LoginUrl + redirectUrl, true);
            }
            else
            {
                base.OnActionExecuting(filterContext);
            }
        }

        private bool CheckAccessRight(string Action, string Controller)
        {
            return true;
        }
    }
}