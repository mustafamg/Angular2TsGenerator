using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Angular2TsGenerator.products;

namespace Angular2TsGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            var modelName = args.Length > 0 ? args[0] : "TestTemplate2";

            //products_routing t4 = new products_routing {ModelName = modelName};
            var t4 = new products_routing();
            t4.Session = new Microsoft.VisualStudio.TextTemplating.TextTemplatingSession();
            t4.Session["modelName"] = modelName;
            // Add other parameter values to t.Session here.  
            t4.Initialize(); // Must call this to transfer values.
            var pageContent = t4.TransformText();
            System.IO.File.WriteAllText("outputPage.html", pageContent);
            Console.WriteLine("Done");
        }
    }
}
