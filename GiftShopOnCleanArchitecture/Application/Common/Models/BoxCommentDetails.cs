﻿using Domain.Emuns;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Common.Models
{
    public class BoxCommentDetails
    {
        public string UserId { get; set; }

        public string UserName { get; set; }

        public float? Score { get; set; }

        public string CommentMessage { get; set; }

        public Attitude? Attitude { get; set; }
    }
}