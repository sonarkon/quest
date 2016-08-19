var state = require('./state.js');

var asyncFunctions = {
    'GetInput': function (args, complete) {
        // TODO: Override input handler
        
        setTimeout(function () {
            complete('test');
        }, 200);
    }
};

var functions = {
    // String Functions
    'Left': function (args) {
        var input = args[0];
        var length = args[1];
        if (input == null) return '';
        return input.substring(0, length);
    },
    'Right': function (args) {
        var input = args[0];
        var length = args[1];
        if (input == null) return '';
        return input.substring(input.length - length - 1);
    },
    'Mid': function (args) {
        var input = args[0];
        var start = args[1];
        if (args.length > 2) {
            var length = args[2];
            return input.substr(start - 1, length);
        }
        return input.substr(start - 1);
    },
    'UCase': function (args) {
        var input = args[0];
        return input.toUpperCase();
    },
    'LCase': function (args) {
        var input = args[0];
        return input.toLowerCase();
    },
    'LengthOf': function (args) {
        var input = args[0];
        if (typeof input === 'undefined' || input === null) return 0;
        return input.length;
    },
    'CapFirst': function (args) {
        var input = args[0];
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    },
    'Instr': function (args) {
        var input, search;
        if (args.length > 2) {
            var start = args[0];
            input = args[1];
            search = args[2];
            return input.indexOf(search, start - 1) + 1;
        }
        input = args[0];
        search = args[1];
        return input.indexOf(search) + 1;
    },
    'InstrRev': function (args) {
        var input, search;
        if (args.length > 2) {
            var start = args[0];
            input = args[1];
            search = args[2];
            return input.lastIndexOf(search, start - 1) + 1;
        }
        input = args[0];
        search = args[1];
        return input.lastIndexOf(search) + 1;
    },
    'StartsWith': function (args) {
        var input = args[0];
        var search = args[1];
        return input.indexOf(search) === 0;
    },
    'EndsWith': function (args) {
        var input = args[0];
        var search = args[1];
        return input.indexOf(search) === input.length - search.length;
    },
    'Split': function (args) {
        var input = args[0];
        var splitChar = args[1];
        return input.split(splitChar);
    },
    'Join': function (args) {
        var input = args[0];
        var joinChar = args[1];
        // TODO: Handle other types
        if (!input.type || input.type != 'stringlist') {
            throw 'Unhandled type passed to Join';
        }
        return input.value.join(joinChar);
    },
    'IsNumeric': function (args) {
        var input = args[0];
        return !isNaN(parseFloat(input)) && isFinite(input);
    },
    'Replace': function (args) {
        var input = args[0];
        var oldString = args[1];
        var newString = args[2];
        return input.split(oldString).join(newString);
    },
    'Trim': function (args) {
        var input = args[0];
        return input.trim();
    },
    'LTrim': function (args) {
        var input = args[0];
        return input.replace(/^\s+/,'');
    },
    'RTrim': function (args) {
        var input = args[0];
        return input.replace(/\s+$/,'');
    },
    'Asc': function (args) {
        var input = args[0];
        return input.charCodeAt(0);
    },
    'Chr': function (args) {
        var input = args[0];
        return String.fromCharCode(input);
    },
    // ExpressionOwner functions
    'Template': function (args) {
        var name = getParameter(args[0], 'Template', 'string');
        return state.getTemplate(name).attributes.text;
    },
    'DynamicTemplate': function () {
        // TODO
        throw 'DynamicTemplate not implemented';
    },
    'HasString': function (args) {
        var element = getParameter(args[0], 'HasString', 'element');
        var attribute = getParameter(args[1], 'HasString', 'string');
        return state.hasAttributeOfType(element, attribute, 'string');
    },
    'GetString': function (args) {
        var element = getParameter(args[0], 'GetString', 'element');
        var attribute = getParameter(args[1], 'GetString', 'string');
        return state.getAttributeOfType(element, attribute, 'string');
    },
    'HasBoolean': function (args) {
        var element = getParameter(args[0], 'HasBoolean', 'element');
        var attribute = getParameter(args[1], 'HasBoolean', 'string');
        return state.hasAttributeOfType(element, attribute, 'boolean');
    },
    'GetBoolean': function (args) {
        var element = getParameter(args[0], 'GetBoolean', 'element');
        var attribute = getParameter(args[1], 'GetBoolean', 'string');
        return state.getAttributeOfType(element, attribute, 'boolean');
    },
    'HasInt': function (args) {
        var element = getParameter(args[0], 'HasInt', 'element');
        var attribute = getParameter(args[1], 'HasInt', 'string');
        return state.hasAttributeOfType(element, attribute, 'int');
    },
    'GetInt': function (args) {
        var element = getParameter(args[0], 'GetInt', 'element');
        var attribute = getParameter(args[1], 'GetInt', 'string');
        return state.getAttributeOfType(element, attribute, 'int');
    },
    'HasDouble': function (args) {
        var element = getParameter(args[0], 'HasString', 'element');
        var attribute = getParameter(args[1], 'HasString', 'string');
        return state.hasAttributeOfType(element, attribute, 'double');
    },
    'GetDouble': function (args) {
        var element = getParameter(args[0], 'HasDouble', 'element');
        var attribute = getParameter(args[1], 'HasDouble', 'string');
        return state.getAttributeOfType(element, attribute, 'double');
    },
    'HasScript': function (args) {
        var element = getParameter(args[0], 'HasScript', 'element');
        var attribute = getParameter(args[1], 'HasScript', 'string');
        return state.hasAttributeOfType(element, attribute, 'script');
    },
    'HasObject': function (args) {
        var element = getParameter(args[0], 'HasObject', 'element');
        var attribute = getParameter(args[1], 'HasObject', 'string');
        return state.hasAttributeOfType(element, attribute, 'object');
    },
    'HasDelegateImplementation': function () {
        // TODO
        throw 'HasDelegateImplementation not implemented';
    },
    'GetAttribute': function () {
        // TODO
        throw 'GetAttribute not implemented';
    },
    'HasAttribute': function (args) {
        var element = getParameter(args[0], 'HasAttribute', 'element');
        var attribute = getParameter(args[1], 'HasAttribute', 'string');
        return state.hasAttribute(element, attribute);
    },
    'GetAttributeNames': function (args) {
        var element = getParameter(args[0], 'GetAttributeNames', 'element');
        var includeInheritedAttributes = getParameter(args[1], 'GetAttributeNames', 'boolean');
        var result = state.newAttribute('stringlist');
        result.value = state.attributeNames(element, includeInheritedAttributes);
        return result;
    },
    'GetExitByLink': function () {
        // TODO
        throw 'GetExitByLink not implemented';
    },
    'GetExitByName': function () {
        // TODO
        throw 'GetExitByName not implemented';
    },
    'Contains': function (args) {
        var parent = getParameter(args[0], 'Contains', 'element');
        var element = getParameter(args[1], 'Contains', 'element');
        return state.contains(parent, element);
    },
    'NewStringList': function () {
        return state.newAttribute('stringlist');
    },
    'NewObjectList': function () {
        return state.newAttribute('objectlist');
    },
    'NewList': function () {
        return state.newAttribute('list');
    },
    'NewStringDictionary': function () {
        return state.newAttribute('stringdictionary');
    },
    'NewObjectDictionary': function () {
        return state.newAttribute('objectdictionary');
    },
    'NewScriptDictionary': function () {
        return state.newAttribute('scriptdictionary');
    },
    'NewDictionary': function () {
        return state.newAttribute('dictionary');
    },
    'ListContains': function (args) {
        var list = args[0];
        var item = args[1];
        checkIsList(list);
        return list.value.indexOf(item) !== -1;
    },
    'AllObjects': function () {
        var objects = state.getElements('object', 'object');
        var result = state.newAttribute('objectlist');
        result.value = objects;
        return result;
    },
    'AllExits': function () {
        var exits = state.getElements('object', 'exit');
        var result = state.newAttribute('objectlist');
        result.value = exits;
        return result;
    },
    'AllTurnScripts': function () {
        var turnScripts = state.getElements('object', 'turnscript');
        var result = state.newAttribute('objectlist');
        result.value = turnScripts;
        return result;
    },
    'AllCommands': function () {
        var commands = state.getElements('object', 'command');
        var result = state.newAttribute('objectlist');
        result.value = commands;
        return result;
    },
    'ListCount': function (args) {
        var list = args[0];
        checkIsList(list);
        return list.value.length;
    },
    'ListItem': function () {
        // TODO
        throw 'ListItem not implemented';
    },
    'StringListItem': function () {
        // TODO
        throw 'StringListItem not implemented';
    },
    'ObjectListItem': function () {
        // TODO
        throw 'ObjectListItem not implemented';
    },
    'GetObject': function (args) {
        var name = getParameter(args[0], 'GetObject', 'string');
        return state.tryGetElement(name);
    },
    'GetTimer': function () {
        // TODO
        throw 'GetTimer not implemented';
    },
    'TypeOf': function (args) {
        var value;
        if (args.length === 1) {
            value = args[0];
        }
        else {
            var element = getParameter(args[0], 'TypeOf', 'element');
            var attribute = getParameter(args[1], 'TypeOf', 'string');
            value = state.get(element, attribute);
        }
        return state.typeOf(value);
    },
    'RunDelegateFunction': function () {
        // TODO
        throw 'RunDelegateFunction not implemented';
    },
    'SafeXML': function (args) {
        var input = getParameter(args[0], 'SafeXML', 'string');
        return input.replace(/&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
    },
    'IsRegexMatch': function (args) {
        var pattern = getParameter(args[0], 'IsRegexMatch', 'string');
        var input = getParameter(args[1], 'IsRegexMatch', 'string');
        var cacheId = getParameter(args[2], 'IsRegexMatch', 'string', true);
        var regex = getRegex(pattern, cacheId).regex;
        var result = regex.test(input);
        return result;
    },
    'GetMatchStrength': function (args) {
        var pattern = getParameter(args[0], 'GetMatchStrength', 'string');
        var input = getParameter(args[1], 'GetMatchStrength', 'string');
        var cacheId = getParameter(args[2], 'GetMatchStrength', 'string', true);
        var regex = getRegex(pattern, cacheId).regex;
        return getMatchStrength(regex, input);
    },
    'Populate': function (args) {
        var pattern = getParameter(args[0], 'Populate', 'string');
        var input = getParameter(args[1], 'Populate', 'string');
        var cacheId = getParameter(args[2], 'Populate', 'string', true);
        var regex = getRegex(pattern, cacheId);
        var result = state.newAttribute('stringdictionary');
        result.value = populate(regex, input);
        return result;
    },
    'DictionaryItem': function () {
        // TODO
        throw 'DictionaryItem not implemented';
    },
    'StringDictionaryItem': function () {
        // TODO
        throw 'StringDictionaryItem not implemented';
    },
    'ObjectDictionaryItem': function () {
        // TODO
        throw 'ObjectDictionaryItem not implemented';
    },
    'ScriptDictionaryItem': function () {
        // TODO
        throw 'ScriptDictionaryItem not implemented';
    },
    'ShowMenu': function () {
        // TODO
        throw 'ShowMenu not implemented';
    },
    'DictionaryContains': function (args) {
        var dic = args[0];
        var key = getParameter(args[1], 'DictionaryContains', 'string');
        checkIsDictionary(dic);
        return dic.hasOwnProperty(key);
    },
    'DictionaryCount': function () {
        // TODO
        throw 'DictionaryCount not implemented';
    },
    'ToInt': function () {
        // TODO
        throw 'ToInt not implemented';
    },
    'ToDouble': function () {
        // TODO
        throw 'ToDouble not implemented';
    },
    'ToString': function (args) {
        return '' + args[0];
    },
    'IsInt': function () {
        // TODO
        throw 'IsInt not implemented';
    },
    'IsDouble': function () {
        // TODO
        throw 'IsDouble not implemented';
    },
    'GetInput': function () {
        // TODO
        throw 'GetInput not implemented';
    },
    'GetFileURL': function () {
        // TODO
        throw 'GetFileURL not implemented';
    },
    'GetFileData': function () {
        // TODO
        throw 'GetFileData not implemented';
    },
    'GetUniqueElementName': function () {
        // TODO
        throw 'GetUniqueElementName not implemented';
    },
    'Ask': function () {
        // TODO
        throw 'Ask not implemented';
    },
    'GetRandomInt': function () {
        // TODO
        throw 'GetRandomInt not implemented';
    },
    'GetRandomDouble': function () {
        // TODO
        throw 'GetRandomDouble not implemented';
    },
    'Eval': function () {
        // TODO
        throw 'Eval not implemented';
    },
    'Clone': function () {
        // TODO
        throw 'Clone not implemented';
    },
    'DoesInherit': function () {
        // TODO
        throw 'DoesInherit not implemented';
    },
    'ListCombine': function (args) {
        var list1 = args[0];
        var list2 = args[1];
        checkIsList(list1);
        if (list1.type != list2.type) {
            throw 'Mismatched list types passed to ListCombine';
        }
        var result = state.newAttribute(list1.type);
        result.value = list1.value.concat(list2.value);
        return result;
    },
    'ListExclude': function () {
        // TODO
        throw 'ListExclude not implemented';
    },
    'GetAllChildObjects': function (args) {
        var element = getParameter(args[0], 'GetAllChildObjects', 'element');
        var result = state.newAttribute('objectlist');
        result.value = state.getAllChildren(element, 'object', 'object');
        return result;
    },
    'GetDirectChildren': function (args) {
        var element = getParameter(args[0], 'GetAllChildObjects', 'element');
        var result = state.newAttribute('objectlist');
        result.value = state.getDirectChildren(element, 'object', 'object');
        return result;
    },
    'IsGameRunning': function () {
        // TODO
        throw 'IsGameRunning not implemented';
    },
    'ObjectListSort': function () {
        // TODO
        throw 'ObjectListSort not implemented';
    },
    'ObjectListSortDescending': function () {
        // TODO
        throw 'ObjectListSortDescending not implemented';
    },
    'StringListSort': function () {
        // TODO
        throw 'StringListSort not implemented';
    },
    'StringListSortDescending': function () {
        // TODO
        throw 'StringListSortDescending not implemented';
    },
    'GetUIOption': function (args) {
        var option = getParameter(args[0], 'GetUIOption', 'string');
        if (option == 'UseGameColours' || option == 'UseGameFont') {
            return 'true';
        }
        return null;
    }
};

var checkIsList = function (list) {
    if (list.type != 'list' && list.type != 'stringlist' && list.type != 'objectlist') {
        throw 'Value is not a list type';
    }
};

var checkIsDictionary = function (dic) {
    if (dic.type != 'stringdictionary' &&
        dic.type != 'objectdictionary' &&
        dic.type != 'objectlist' &&
        dic.type != 'dictionary') {
        throw 'Value is not a dictionary type';
    }
};

var getParameter = function (parameter, caller, type, allowNull) {
    if (allowNull && parameter == null) return null;
    var actualType = state.typeOf(parameter);
    if (actualType !== type) {
        throw caller + ' function expected ' + type + ' parameter but was passed ' + actualType;
    }
    return parameter;
};

var regexCache = {};

var getRegex = function (regex, cacheId) {
    var result;
    if (cacheId) {
        result = regexCache[cacheId];
        if (result) return result;
    }
    var cleanPattern = namedRegex.cleanRegExp(regex);
    result = {
        map: namedRegex.getMap(regex),
        regex: new RegExp(cleanPattern, 'i')
    };
    if (cacheId) {
        regexCache[cacheId] = result;
    }
    return result;
};

var getMatchStrength = function (regex, input) {
    // Based on Utility.GetMatchStrengthInternal

    if (!regex.test(input)) {
        throw '"' + input + '" is not a match for regex "' + regex + '"';
    }

    // The idea is that you have a regex like
    //          look at (?<object>.*)
    // And you have a string like
    //          look at thing
    // The strength is the length of the "fixed" bit of the string, in this case "look at ".
    // So we calculate this as the length of the input string, minus the length of the
    // text that matches the named groups.

    var lengthOfTextMatchedByGroups = 0;
    var matches = regex.exec(input);
    matches.shift();
    matches.forEach(function (group) {
        if (group) lengthOfTextMatchedByGroups += group.length;
    });
    return input.length - lengthOfTextMatchedByGroups;
};

var populate = function (regexAndMap, input) {
    var matches = regexAndMap.regex.exec(input);
    var result = namedRegex.mapCaptures(regexAndMap.map, matches);
    return result;
};

var namedRegex = {
    // Based on https://gist.github.com/gbirke/2cc2370135b665eee3ef
    getMap: function (rx) {
        var braceMatch = /(\?<(\w+)>)/g,
            braceMap = {},
            braceCount = 0,
            match;
        while ((match = braceMatch.exec(rx))) {
            braceCount++;
            if (match[2]) {
                braceMap[braceCount] = match[2];
            }
        }
        return braceMap;
    },
    mapCaptures: function (map, captures) {
        var idx, result = {};
        if (captures === null) {
            return null;
        }
        for (idx in map) {
            if (captures[idx]) {
                result[map[idx]] = captures[idx];
            }
        }
        return result;
    },
    cleanRegExp: function (rx) {
        return rx.replace(/\(\?<\w+>/g, '(');
    }
};

exports.asyncFunctions = asyncFunctions;
exports.functions = functions;