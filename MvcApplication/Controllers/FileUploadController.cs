using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcApplication.Models;

namespace MvcApplication.Controllers
{
    public class FileUploadController : Controller
    {
        //
        // GET: /FileUpload/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Upload(FormCollection form, HttpPostedFileBase file)
        {
            var uploadsViewModel = Session["Uploads"] != null ? Session["Uploads"] as UploadsViewModel : new UploadsViewModel();

            if (file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                if (fileName != null)
                {
                    var path = Path.Combine(Server.MapPath("~/App_Data/uploads"), fileName);
                    file.SaveAs(path);

                    uploadsViewModel.Uploads.Add(new FileModel()
                        {
                            FileID = uploadsViewModel.Uploads.Count,
                            FileName = file.FileName,
                            FilePath = path
                        });

                    Session["Uploads"] = uploadsViewModel;
                }
            }

            return View("UploadPartial",uploadsViewModel.Uploads);
        }

        public ActionResult GetFiles(long Id)
        {
            UploadsViewModel viewModel = Session["Uploads"] as UploadsViewModel;

            return PartialView("UploadPartial", (viewModel == null ? new UploadsViewModel().Uploads : viewModel.Uploads));
        }

    }
}
