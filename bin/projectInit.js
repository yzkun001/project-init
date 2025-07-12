#!/usr/bin/env node

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const os = require('os')

const repo = 'git@github.com:yzkun001/vue3-template.git' // 👈 改成你自己的模板仓库

function hasCommand(cmd) {
  try {
    execSync(`${cmd} --version`, { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

const getPkgManager = () => {
  if (hasCommand('pnpm')) return 'pnpm'
  if (hasCommand('yarn')) return 'yarn'
  return 'npm'
}

const run = () => {
  const projectName = process.argv[2]

  if (!projectName) {
    console.error('❌ 项目名称不能为空！用法：npx project-init my-app')
    process.exit(1)
  }

  const targetPath = path.join(process.cwd(), projectName)
  if (fs.existsSync(targetPath)) {
    console.error('❌ 当前目录已存在同名文件夹')
    process.exit(1)
  }

  const pkgManager = getPkgManager()

  console.log(`🚀 使用包管理器: ${pkgManager}`)
  console.log(`📁 开始创建项目 ${projectName}...`)

  try {
    execSync(`git clone ${repo} ${projectName}`, { stdio: 'inherit' })

    const gitDir = path.join(targetDir, '.git')
if (existsSync(gitDir)) {
  rmSync(gitDir, { recursive: true, force: true })
}


    console.log('📦 正在安装依赖...')
    execSync(`cd ${projectName} && ${pkgManager} install`, {
      stdio: 'inherit',
      shell: os.platform() === 'win32',
    })

    console.log('\n🎉 项目创建完成！后续操作：')
    console.log(`👉 cd ${projectName}`)
    console.log(`👉 ${pkgManager} run dev`)
  } catch (err) {
    console.error('❌ 出错了:', err.message)
    process.exit(1)
  }
}

run()
