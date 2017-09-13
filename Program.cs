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
            var modelName = args.Length > 0 ? args[0] : "TestTemplate";

            products_routing t4 = new products_routing {ModelName = modelName};
            String pageContent = t4.TransformText();
            System.IO.File.WriteAllText("outputPage.html", pageContent);
            Console.WriteLine("Done");
        }
    }
}
