using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcApplication.Models
{

    public class UploadsViewModel
    {
        public long ID { get; set; }
        public List<FileModel> Uploads { get; set; }

        public UploadsViewModel()
        {
            this.Uploads = new List<FileModel>();
        }
    }



    public class FileModel
    {
        public string FilePath { get; set; }
        public long FileID { get; set; }
        public string FileName { get; set; }
    }
}