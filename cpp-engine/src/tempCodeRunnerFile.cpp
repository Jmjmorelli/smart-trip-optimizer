#include <iostream>
#include <fstream>
#include <nlohmann/json.hpp>  // Use this include if installed via a package manager (vcpkg, conan, etc.)
// #include "json.hpp"       // Alternatively, use this if you're using the manually downloaded header

using json = nlohmann::json;

int main()
{
    // 1. Open the JSON file.
    // Adjust the path based on your working directory.
    std::ifstream inputFile("../input.json");
    if (!inputFile.is_open()) {
        std::cerr << "Could not open JSON file!" << std::endl;
        return 1;
    }

    // 2. Parse the JSON file.
    json j;
    try {
        inputFile >> j;
    }
    catch (const json::parse_error& err) {
        std::cerr << "JSON parse error: " << err.what() << std::endl;
        return 1;
    }

    // 3. Process the JSON data.
    // Example: read the "number" field
    if (j.contains("number"))
    {
        int numberValue = j["number"];
        std::cout << "numberValue: " << numberValue << std::endl;
    }

    // Example: read the "message" field
    if (j.contains("message"))
    {
        std::string messageValue = j["message"];
        std::cout << "messageValue: " << messageValue << std::endl;
    }

    // 4. Manipulate the JSON data
    j["newField"] = "This is a new field!";
    j["number"] = 99;  // Overwrite the original number

    // Print the updated JSON with pretty printing (4 spaces indent)
    std::cout << "Updated JSON: " << std::endl << j.dump(4) << std::endl;

    // 5. Optionally, write the updated JSON to a file.
    // std::ofstream outputFile("../output.json");
    // if (outputFile.is_open()) {
    //     outputFile << j.dump(4);
    //     outputFile.close();
    // }

    inputFile.close();
    return 0;
}
