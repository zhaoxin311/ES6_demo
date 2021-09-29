<template>
  <!-- 份额登记申请 -->
  <AppForm title="份额登记申请">
    <template #header>
      <el-button v-if="!disabled" v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="submitForm">登记申请</el-button>
    </template>
    <div class="apply-form-wrap">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="apply-form" label-position="right" label-width="200px">
        <el-form-item>
          <FormTitle index="1" title="份额持有人基本信息" />
        </el-form-item>
        <el-form-item label="份额持有人名称">
          <el-input v-model.trim="userInfo.name" disabled />
        </el-form-item>
        <el-form-item label="份额持有人简称">
          <el-input v-model.trim="userInfo.name" disabled />
        </el-form-item>
        <el-form-item>
          <FormTitle index="2" title="份额基本信息" />
        </el-form-item>
        <el-form-item label="基金名称" prop="fundName">
          <el-input v-model.trim="ruleForm.fundName" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="基金名称简称" prop="fundAbbrev">
          <el-input v-model.trim="ruleForm.fundAbbrev" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="份额类别" prop="fundCategory">
          <el-select v-model="ruleForm.fundCategory" :disabled="disabled">
            <el-option label="股份有限公司股份（股）" value="1" />
            <el-option label="有限责任公司股份（元）" value="2" />
            <el-option label="合伙企业财产份额（份）" value="3" />
            <el-option label="其他" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="申请登记数量" prop="registerAmount">
          <el-input v-model="ruleForm.registerAmount" v-input-limit="/\D/g" :disabled="disabled">
            <template v-if="ruleForm.fundCategory === '1'" slot="append">股</template>
            <template v-else-if="ruleForm.fundCategory === '2'" slot="append">元</template>
            <template v-else slot="append">份</template>
          </el-input>
        </el-form-item>
        <el-form-item label="申请登记面值" prop="registerParValue">
          <el-input v-model="ruleForm.registerParValue" v-input-limit="/\D/g" :disabled="disabled">
            <template slot="append">每份（股）面值</template>
          </el-input>
        </el-form-item>
        <el-form-item class="money">
          <span>{{ ruleForm.registerParValue | toUpperCase }}</span>
        </el-form-item>
        <el-form-item label="是否国有资产" prop="isStateOwned">
          <el-select v-model="ruleForm.isStateOwned" :disabled="disabled">
            <el-option label="是" value="0" />
            <el-option label="否" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="基金备案编号" prop="recordNumber">
          <el-input v-model="ruleForm.recordNumber" v-input-limit="/\W/g" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="是否存在质押/司法冻结" class="pledge-frozen">
          <el-radio v-model="isPledge" :label="true" :disabled="disabled">是</el-radio>
          <el-radio v-model="isPledge" :label="false" :disabled="disabled">否</el-radio>
        </el-form-item>
        <el-form-item v-if="isPledge" label="质押份额数" prop="pledgeAmount">
          <el-input v-model.number="ruleForm.pledgeAmount" v-input-limit="/\D/g" :disabled="disabled" />
        </el-form-item>
        <el-form-item v-if="isPledge" label="司法冻结份额数" prop="frozenAmount">
          <el-input v-model.number="ruleForm.frozenAmount" v-input-limit="/\D/g" :disabled="disabled" />
        </el-form-item>
        <el-form-item>
          <FormTitle index="3" title="经办人基本信息" />
        </el-form-item>
        <el-form-item label="联系人名称" prop="contact">
          <el-input v-model.trim="ruleForm.contact" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="证件类型" prop="contactCredentialType">
          <el-select v-model="ruleForm.contactCredentialType" style="width: 120px" :disabled="disabled">
            <el-option label="身份证" value="2" />
            <el-option label="其他" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item :label="ruleForm.contactCredentialType == '2' ? '联系人证件号码' : '其他证件号码'" :prop="ruleForm.contactCredentialType == '2' ? 'contactCredentialNumber' : 'contactCredentialOther'">
          <el-input v-model.trim="ruleForm.contactCredentialNumber" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactMobile">
          <el-input v-model.trim="ruleForm.contactMobile" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="电子邮箱">
          <el-input v-model.trim="ruleForm.contactEmail" v-input-limit="/[^\x00-\xff]/g" :disabled="disabled" />
        </el-form-item>
      </el-form>
      <FormItem class="title-top-spacing">
        <FormTitle index="4" title="上传文件" />
      </FormItem>
      <FormUpload
        ref="formUpload"
        :data="ruleForm"
        label-position="left"
        :url="url"
        @on-success="onSuccess"
        @on-error="onError"
        @validate-success="validateSuccess"
      >
        <FormUploadItem
          v-for="(item, index) in formUploadList"
          :key="index"
          :label="item.name"
          :description="item.description"
          :file-type="item.fileType"
          :preview="modify ? `${imgBaseSrc}/web/#` + resultFiles[index] : ''"
          :file-name="modify ? resultFileNames[index] : ''"
          :optional="modify ? true : false"
          :disabled="disabled ? true : false"
        />
      </FormUpload>
    </div>
    <!-- <template #footer>
      <div style="text-align: right">
        <el-button type="primary" @click="submitForm">登记申请</el-button>
      </div>
    </template> -->
  </AppForm>
</template>

<script>
import { getApplyFormInfo } from '@/api/apply-form'
import rules from './rules'
import { gettransferorInfo } from '@/api/granter-share'
import AppForm from '@/components/AppForm/index.vue'
import FormTitle from '@/components/AppForm/FormTitle.vue'
import FormItem from '@/components/AppForm/FormItem.vue'
import FormUpload from '@/components/Upload/FormUpload'
import FormUploadItem from '@/components/Upload/FormUploadItem'
import { digitUppercase } from '@/utils/money'
import regs from '@/directive/regex'
export default {
  components: {
    AppForm,
    FormUpload,
    FormUploadItem,
    FormTitle,
    FormItem
  },
  filters: {
    toUpperCase(val) {
      return digitUppercase(val.replace(/,/g, ''))
    }
  },
  data() {
    return {
      imgBaseSrc: process.env.VUE_APP_IMGSRC,
      url: '/fund-web/api/fund-register-apply/add',
      modify: false,
      isPledge: false,
      userInfo: {},
      formUploadList: [
        { fileType: ['pdf'], description: '上传 pdf 文件 不超过 5 MB', name: '份额初始登记申请表' },
        { fileType: ['pdf'], description: '上传 pdf 文件 不超过 5 MB', name: '登记存管协议文件' },
        { fileType: ['pdf'], description: '上传 pdf 文件 不超过 5 MB', name: '合伙协议或投资协议' },
        { fileType: ['pdf'], description: '上传 pdf 文件 不超过 5 MB', name: '基金份额持有人名册（加盖公章）' },
        { fileType: ['jpg', 'pdf'], description: '上传 jpg/pdf 文件 不超过 5 MB', name: '资格证明文件复印件（加盖公章）' },
        { fileType: ['jpg', 'pdf'], description: '上传 jpg/pdf 文件 不超过 5 MB', name: '授权委托人及经办人 有效身份证件' },
        { fileType: ['pdf'], description: '上传 pdf 文件 不超过 5 MB', name: '备案证明文件（基金份额在基金协会备案证明文件）' },
        { fileType: ['pdf'], description: '上传 pdf 文件 不超过 5 MB', name: '授权委托书（其他材料）' }
      ],
      stepsActive: 0,
      ruleForm: {
        possessorName: '', // 份额持有人名称
        possessorAbbrev: '', // 份额持有人简称
        fundName: '', // 基金名称
        fundAbbrev: '', // 基金名称简称
        fundCategory: '1', // 份额类别id
        registerAmount: '', // 申请登记数量(份(股/元))
        registerParValue: '', // 申请登记面值（每份（股）面值）
        pledgeAmount: '', // 质押份额数
        frozenAmount: '', // 司法冻结份额数
        isStateOwned: '0', // 是否国有资产
        recordNumber: '', // 基金备案编号
        contact: '', // 联系人名称
        contactCredentialNumber: '', // 联系人证件号码
        contactCredentialType: '2', // 联系人证件类型
        contactMobile: '', // 联系电话
        contactEmail: '' // 电子邮箱
      },
      resultFiles: [], // 文件列表
      resultFileNames: [],
      rules,
      disabled: false,
      fullscreenLoading: false
    }
  },
  watch: {
    isPledge(newVlaue) {
      if (!newVlaue) {
        this.ruleForm.pledgeAmount = ''
        this.ruleForm.frozenAmount = ''
      }
    },
    'ruleForm.contactCredentialType'(newValue) {
      // this.ruleForm.contactCredentialNumber = ''
      this.$refs.ruleForm.clearValidate()
    },
    'ruleForm.registerParValue'(newValue) {
        if (newValue) {
          this.ruleForm.registerParValue = newValue.replace(regs.bankCount, ',')
        }
    }
  },
  created() {
    this.getUeserInfo()
    this.applyFormInfo()
  },
  methods: {
    async getUeserInfo() {
      const response = await gettransferorInfo()
      if (Number(response.status) === 200) {
        this.userInfo = response.data
      }
    },
    // 初始化数据
    async applyFormInfo() {
      const { id, type } = this.$route.query
      if (type) this.disabled = true
      if (!id) return
      this.modify = true
      if (this.modify) {
        this.url = '/fund-web/api/fund-register-apply/modify'
      } else {
        this.url = '/fund-web/api/fund-register-apply/add'
      }
      const response = await getApplyFormInfo({ id })
      if (Number(response.status) === 200) {
        response.data.resultFiles.forEach(val => {
          this.resultFileNames.push(val.fileName)
          this.resultFiles.push(val.path)
        })
        const { id, fundName, fundAbbrev, fundCategory, isStateOwned, registerAmount, registerParValue, pledgeAmount, frozenAmount, contact, contactCredentialNumber, contactCredentialType, contactMobile, contactEmail, recordNumber } = response.data
        if (!pledgeAmount || !frozenAmount) {
          this.isPledge = false
          this.ruleForm.pledgeAmount = ''
          this.ruleForm.frozenAmount = ''
        } else {
          this.isPledge = true
        }
        this.ruleForm.id = id
        this.ruleForm.possessorName = this.userInfo.agentPerson
        this.ruleForm.possessorAbbrev = this.userInfo.agentPerson
        this.ruleForm.fundName = fundName
        this.ruleForm.fundAbbrev = fundAbbrev
        this.ruleForm.fundCategory = fundCategory
        this.ruleForm.registerAmount = registerAmount
        this.ruleForm.registerParValue = registerParValue
        !pledgeAmount ? this.ruleForm.pledgeAmount = '' : this.ruleForm.pledgeAmount = pledgeAmount
        !frozenAmount ? this.ruleForm.frozenAmount = '' : this.ruleForm.frozenAmount = frozenAmount
        this.ruleForm.contact = contact
        this.ruleForm.isStateOwned = isStateOwned
        this.ruleForm.contactCredentialNumber = contactCredentialNumber
        this.ruleForm.contactCredentialType = contactCredentialType
        this.ruleForm.contactMobile = contactMobile
        this.ruleForm.contactEmail = contactEmail ?? ''
        this.ruleForm.recordNumber = recordNumber

        // 统一数据格式，键值类型为 string
        for (const prop in this.ruleForm) {
          if (typeof this.ruleForm[prop] === 'number') {
            this.ruleForm[prop] = String(this.ruleForm[prop])
          }
        }
      }
    },
    // 提交表单
    submitForm() {
      if (this.ruleForm.registerAmount > 2 ** 31 - 1) {
        this.$message.error('申请数额过大')
        return
      }
      if (!this.ruleForm.pledgeAmount || !this.ruleForm.frozenAmount) {
        this.ruleForm.pledgeAmount = 0
        this.ruleForm.frozenAmount = 0
      }
      // 给后端去掉金额 ,
      this.ruleForm.registerParValue = this.ruleForm.registerParValue.replace(/,/g, '')

      this.ruleForm.possessorName = this.userInfo.agentPerson
      this.ruleForm.possessorAbbrev = this.userInfo.agentPerson
      console.log(this.ruleForm)
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$refs.formUpload.validate()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    onSuccess() {
      this.fullscreenLoading = false
      this.$message.success('已提交申请')
      this.$router.push('/fenedengji')
      // this.setRegister(false)
    },
    onError(err) {
      this.fullscreenLoading = false
      this.$message.error(err.message)
    },
    validateSuccess(submit) {
      this.fullscreenLoading = true
      submit()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-unit, .money ::v-deep.el-form-item__content{
  color: #666;
  font-size: 12px;
}
.money ::v-deep.el-form-item__content{
  line-height: 14px;
}
</style>
