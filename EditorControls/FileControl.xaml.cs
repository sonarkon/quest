﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Controls;

namespace TextAdventures.Quest.EditorControls
{
    [ControlType("file")]
    public partial class FileControl : UserControl, IElementEditorControl
    {
        private ControlDataHelper<string> m_helper;
        private string m_source;
        private IEditorData m_data;

        public FileControl()
        {
            InitializeComponent();

            m_helper = new ControlDataHelper<string>(this);
            m_helper.Initialise += m_helper_Initialise;
        }

        void m_helper_Initialise()
        {
            fileDropDown.BasePath = System.IO.Path.GetDirectoryName(m_helper.Controller.Filename);
            m_source = m_helper.ControlDefinition.GetString("source");
            fileDropDown.Preview = m_helper.ControlDefinition.GetBool("preview");

            if (m_source == "libraries")
            {
                m_source = "*.aslx";
                fileDropDown.FileLister = GetAvailableLibraries;
            }
            else
            {
                fileDropDown.FileLister = GetFilesInGamePath;
            }
            fileDropDown.FileFilter = string.Format("{0} ({1})|{1}", m_helper.ControlDefinition.GetString("filefiltername"), m_source);
        }

        private void lstFiles_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            m_helper.SetDirty(fileDropDown.Filename);
            Save();
        }

        public IControlDataHelper Helper
        {
            get { return m_helper; }
        }

        public void Populate(IEditorData data)
        {
            m_data = data;
            if (data == null) return;
            m_helper.StartPopulating();
            fileDropDown.RefreshFileList();
            fileDropDown.Filename = m_helper.Populate(data);
            fileDropDown.Enabled = m_helper.CanEdit(data) && !data.ReadOnly;
            m_helper.FinishedPopulating();
        }

        public void Save()
        {
            if (m_data == null) return;
            if (!m_helper.IsDirty) return;
            string saveValue = Filename;
            m_helper.Save(saveValue);
        }

        private IEnumerable<string> GetAvailableLibraries()
        {
            yield return "";
            foreach (string result in m_helper.Controller.GetAvailableLibraries())
            {
                yield return result;
            }
        }

        private IEnumerable<string> GetFilesInGamePath()
        {
            yield return "";
            foreach (string result in m_helper.Controller.GetAvailableExternalFiles(m_source))
            {
                yield return result;
            }
        }

        public void RefreshFileList()
        {
            fileDropDown.RefreshFileList();
        }

        public string Filename
        {
            get { return fileDropDown.Filename; }
            set { fileDropDown.Filename = value; }
        }

        private void FilenameUpdated(string filename)
        {
            if (m_data != null)
            {
                m_helper.Controller.StartTransaction(String.Format("Set filename to '{0}'", filename));
                m_data.SetAttribute(m_helper.ControlDefinition.Attribute, filename);
                m_helper.Controller.EndTransaction();
                Populate(m_data);
            }
        }

        public bool IsUpdatingList
        {
            get { return fileDropDown.IsUpdatingList; }
        }

        public Control FocusableControl
        {
            get { return fileDropDown.FocusableControl; }
        }

        public event EventHandler<SelectionChangedEventArgs> SelectionChanged
        {
            add
            {
                fileDropDown.SelectionChanged += value;
            }
            remove
            {
                fileDropDown.SelectionChanged -= value;
            }
        }
    }
}
