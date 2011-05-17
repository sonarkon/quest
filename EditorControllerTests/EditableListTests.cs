﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AxeSoftware.Quest;

namespace EditorControllerTests
{
    [TestClass]
    public class EditableListTests : EditorControllerTestBase
    {
        private object m_listattr;
        private IEditableList<string> m_list;

        public override void DoExtraInitialisation()
        {
            m_listattr = Controller.GetEditorData("testobj").GetAttribute("listattr");
            m_list = m_listattr as IEditableList<string>;
        }

        private string GetItemListString(IEditableList<string> list)
        {
            return string.Join(";", list.Items.Select(i => i.Value.Value));
        }

        private string[] GetItemListKeys(IEditableList<string> list)
        {
            return list.Items.Select(i => i.Key).ToArray();
        }

        [TestMethod]
        public void TestListSetup()
        {
            Assert.IsInstanceOfType(m_listattr, typeof(IEditableList<string>));
            Assert.AreEqual("one;two;three;four;five", GetItemListString(m_list));
        }

        [TestMethod]
        public void TestListAdd()
        {
            m_list.Add("new");
            Assert.AreEqual("one;two;three;four;five;new", GetItemListString(m_list));

            Controller.Undo();
            Assert.AreEqual("one;two;three;four;five", GetItemListString(m_list));
        }

        [TestMethod]
        public void TestListRemove()
        {
            m_list.Remove("three");
            Assert.AreEqual("one;two;four;five", GetItemListString(m_list));

            Controller.Undo();
            Assert.AreEqual("one;two;three;four;five", GetItemListString(m_list));
        }
    }
}
